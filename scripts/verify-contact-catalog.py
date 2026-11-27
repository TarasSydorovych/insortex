import json
import sys
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlsplit
from urllib.request import ProxyHandler, build_opener
from xml.etree import ElementTree


origin, project_path = sys.argv[1:]
project = Path(project_path)
retired_category = "672e281b594fc61eeaf887f0"
retired_product = "673cb9560da4bc413f2835e9"
retired_paths = {
    "/ua/catalog/oboronna-promyslovist_", "/ua/product/pol_ova-kukhnya",
    "/en/catalog/defense-industry", "/en/product/field-kitchen",
    "/pl/catalog/przemys-obronny", "/pl/product/kuchnia-polowa",
    "/ru/catalog/oboronnaya-promyshlennost_", "/ru/product/polevaya-kukhnya",
}


def request(path, expected=200):
    try:
        with build_opener(ProxyHandler({})).open(origin + path, timeout=20) as response:
            if response.status == expected and response.url == origin + path:
                return response.read()
            raise RuntimeError(f"{path} повернув HTTP {response.status}")
    except HTTPError as error:
        if error.code == expected:
            return b""
        raise RuntimeError(f"{path} повернув HTTP {error.code}") from error


class ContactPage(HTMLParser):
    def __init__(self, body):
        super().__init__()
        self.card_count = 0
        self.portrait = None
        self.feed(body)

    def handle_starttag(self, tag, attributes):
        element = dict(attributes)
        classes = element.get("class", "")
        if tag == "article" and "contact_personCard__" in classes:
            self.card_count += 1
        if tag == "img" and "contact_portrait__" in classes:
            self.portrait = element


def verify_contact(lang):
    body = request(f"/{lang}/contact").decode()
    page = ContactPage(body)
    locale = project / "src/app/i18n/locales" / lang / "translation.json"
    translations = json.loads(locale.read_text(encoding="utf-8"))
    if page.card_count != 4 or not page.portrait:
        raise RuntimeError(f"/{lang}/contact не показує чотири картки та портрет.")
    if page.portrait.get("alt") != translations["directorName"]:
        raise RuntimeError(f"/{lang}/contact показує інший портрет.")
    if lang == "ua":
        src = page.portrait.get("src", "")
        asset = parse_qs(urlsplit(src).query).get("url", [src])[0]
        photo = project / "src/app/img/directorInsortex.jpg"
        if not asset.startswith("/_next/static/media/") or request(asset) != photo.read_bytes():
            raise RuntimeError("Збірка не показує нове фото Далєра.")


langs = ("ua", "en", "pl", "ru")
with ThreadPoolExecutor(max_workers=3) as pool:
    list(pool.map(verify_contact, langs))
    list(pool.map(lambda path: request(path, expected=404), sorted(retired_paths)))
categories = json.loads(request("/api/category"))
products = json.loads(request("/api/products"))
if not categories or not products:
    raise RuntimeError("Каталог повернув порожні дані.")
if any(row["_id"] == retired_category for row in categories) or any(
    row["_id"] == retired_product or row.get("category") == retired_category for row in products
):
    raise RuntimeError("Прибрана категорія або товар ще доступні через каталог.")
sitemap = ElementTree.fromstring(request("/sitemap.xml"))
paths = {urlsplit(node.text).path for node in sitemap.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
if not paths or not paths.isdisjoint(retired_paths):
    raise RuntimeError("Не вдалося підтвердити вилучення URL із sitemap.")
request("/ua/catalog")
print("Перевірено чотири мовні версії контактів, фото, каталог, sitemap і вісім відповідей 404.")

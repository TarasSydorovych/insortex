import { mongooseConnect } from "../lib/mongoose";
import { publishedCategoryFilter, publishedProductFilter } from "../lib/publishedCatalog";
import { sitemapEntries } from "../lib/sitemap";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import Blog from "../models/Blog";
import Work from "../models/Work";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  await mongooseConnect();
  const [products, categories, blogs, works] = await Promise.all([
    Product.find(publishedProductFilter).select("name updatedAt createdAt").lean(),
    Category.find(publishedCategoryFilter).select("name updatedAt createdAt").lean(),
    Blog.find().select("translations updatedAt createdAt").lean(),
    Work.find().select("translations updatedAt createdAt").lean(),
  ]);
  return sitemapEntries({ products, categories, blogs, works });
}

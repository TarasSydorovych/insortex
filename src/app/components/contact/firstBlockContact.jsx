import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuChevronRight } from "react-icons/lu";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import directorInsortex from "../../img/directorInsortex.jpg";
import LocalInform from "./localInform";
import Map from "./map";
import contactCopy, { directionsUrl } from "./contactCopy";
import css from "./contact.module.css";

const director = {
  role: "director", name: "directorName", phone: "+380675771375", email: "insortex@gmail.com",
};
const team = [
  { role: "saleComercia", name: "saleOneInsortex", phone: "+380668085626", email: "insortex.viktor@gmail.com" },
  { role: "postach", name: "postachName", phone: "+380665464409", email: "maksym.insortex@gmail.com" },
  { role: "construktor", name: "constructorName", phone: "+380997717887", email: "gurina.insortex@gmail.com" },
  { role: "tehDir", name: "tehDirName", phone: "+380950555123", email: "insortex2@gmail.com" },
  { role: "zedMan", name: "zedManName", phone: "+380681567272", email: "aleks.insortex@gmail.com" },
  { role: "nachVur", name: "nachVurName", phone: "+380501014369", email: "0501014369p@gmail.com" },
  { role: "golBuh", name: "golBuhName", email: "insortex4@gmail.com" },
  { role: "hr", name: "jakistName", phone: "+380667556778", email: "kea.avator@gmail.com" },
];

function ContactLinks({ person }) {
  return (
    <div className={css.personLinks}>
      {person.phone && (
        <a href={`tel:${person.phone}`}>
          <MdLocalPhone aria-hidden="true" />
          <span>{person.phone.replace(/^(\+38)(0\d{2})(\d{3})(\d{2})(\d{2})$/, "$1 ($2) $3 $4 $5")}</span>
        </a>
      )}
      <a href={`mailto:${person.email}`}><MdEmail aria-hidden="true" /><span>{person.email}</span></a>
    </div>
  );
}

export default function FirstBlockContact({ t, lng }) {
  const copy = contactCopy(lng);
  return (
    <main className={css.container}>
      <nav className={css.breadcrumbs} aria-label={copy.breadcrumbs}>
        <ol>
          <li><Link href={`/${lng}`}>{t("mainLink")}</Link></li>
          <li><LuChevronRight aria-hidden="true" /><span aria-current="page">{t("contacts")}</span></li>
        </ol>
      </nav>
      <div className={css.heading}>
        <h1>{t("contacts")}</h1>
        <p>{copy.intro}</p>
      </div>
      <div className={css.contactLayout}>
        <LocalInform t={t} />
        <section className={css.mapCard} aria-labelledby="contact-map-title">
          <div className={css.mapHeading}>
            <h2 id="contact-map-title">{t("roztashuvania")}</h2>
            <a className={css.directions} href={directionsUrl} target="_blank" rel="noopener noreferrer">
              {copy.directions}<LuArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className={css.mapArea}><Map title={t("roztashuvania")} /></div>
        </section>
      </div>
      <section className={css.teamSection} aria-labelledby="contact-team-title">
        <h2 id="contact-team-title" className={css.sectionTitle}>{t("ourTeam")}</h2>
        <article className={css.directorCard}>
          <Image src={directorInsortex} alt={t(director.name)} className={css.portrait} sizes="(max-width: 700px) 80px, 128px" />
          <div className={css.directorCopy}>
            <p className={css.role}>{t(director.role)}</p>
            <h3>{t(director.name)}</h3>
          </div>
          <ContactLinks person={director} />
        </article>
        <div className={css.teamGrid}>
          {team.map(person => (
            <article className={css.personCard} key={person.email}>
              <p className={css.role}>{t(person.role)}</p>
              <h3>{t(person.name)}</h3>
              <ContactLinks person={person} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

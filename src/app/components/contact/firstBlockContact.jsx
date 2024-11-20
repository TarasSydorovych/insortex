import css from "./contact.module.css";
import LocalInform from "./localInform";
import Map from "./map";
import directorInsortex from "../../img/directorInsortex.jpg";
import Image from "next/image";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import zaporogets from "../../img/IMG_2892.jpg";
import mostovaA from "../../img/IMG_2886.jpg";
import hrVid from "../../img/IMG_2893.jpg";
import maksum from "../../img/IMG_2888.jpg";
import lendikRoma from "../../img/IMG_2889.jpg";
import jakist from "../../img/IMG_2891.jpg";
const FirstBlockContact = ({ t, lng }) => {
  return (
    <div className={css.wrapContact}>
      <p className={css.pContackMail}>{t("contacts")}</p>
      <div className={css.wrapMapWith}>
        <Map />
        <LocalInform t={t} />
      </div>
      <div className={css.usersContact}>
        <p className={css.pContackMail}>{t("ourTeam")}</p>
        <div className={css.wrapOneUser}>
          <Image
            src={directorInsortex}
            alt="insortex"
            className={css.imageUsers}
          />
          <p className={css.namePosada}>{t("director")}</p>
          <p className={css.nameName}>{t("directorName")}</p>
          <p className={css.phoneD}>
            <MdLocalPhone className={css.mdLocalPhone} />
            +380675771375
          </p>
          <p className={css.phoneD}>
            <MdEmail className={css.mdLocalPhone} />
            insortex@gmail.com
          </p>
        </div>
        <div className={css.wrapAllContact}>
          <div className={css.wrapOneUserNotNew}>
            <Image
              src={zaporogets}
              alt="insortex"
              className={css.imageUsersNew}
            />
            <p className={css.namePosadaNew}>{t("saleComercia")}</p>
            <p className={css.nameNameNew}>{t("saleOneInsortex")}</p>
            <p className={css.phoneDNew}>
              <MdLocalPhone className={css.mdLocalPhoneNew} />
              +380668085626
            </p>
            <p className={css.phoneDNew}>
              <MdEmail className={css.mdLocalPhoneNew} />
              insortex.viktor@gmail.com
            </p>
          </div>
          <div className={css.wrapOneUserNotNew}>
            <Image
              src={mostovaA}
              alt="insortex"
              className={css.imageUsersNew}
            />
            <p className={css.namePosadaNew}>{t("saleManager")}</p>
            <p className={css.nameNameNew}>{t("saleTwoInsortex")}</p>
            <p className={css.phoneDNew}>
              <MdLocalPhone className={css.mdLocalPhoneNew} />
              +380664327169
            </p>
            <p className={css.phoneDNew}>
              <MdEmail className={css.mdLocalPhoneNew} />
              alina.insortex@gmail.com
            </p>
          </div>
          <div className={css.wrapOneUserNotNew}>
            <Image src={hrVid} alt="insortex" className={css.imageUsersNew} />
            <p className={css.namePosadaNew}>{t("hr")}</p>
            <p className={css.nameNameNew}>{t("hrName")}</p>
            <p className={css.phoneDNew}>
              <MdLocalPhone className={css.mdLocalPhoneNew} />
              +380664375029
            </p>
            <p className={css.phoneDNew}>
              <MdEmail className={css.mdLocalPhoneNew} />
              hr.insortex@gmail.com
            </p>
          </div>
          <div className={css.wrapOneUserNotNew}>
            <Image src={maksum} alt="insortex" className={css.imageUsersNew} />
            <p className={css.namePosadaNew}>{t("postach")}</p>
            <p className={css.nameNameNew}>{t("postachName")}</p>
            <p className={css.phoneDNew}>
              <MdLocalPhone className={css.mdLocalPhoneNew} />
              +380665464409
            </p>
            <p className={css.phoneDNew}>
              <MdEmail className={css.mdLocalPhoneNew} />
              maksym.insortex@gmail.com
            </p>
          </div>
          <div className={css.wrapOneUserNotNew}>
            <Image
              src={lendikRoma}
              alt="insortex"
              className={css.imageUsersNew}
            />
            <p className={css.namePosadaNew}>{t("construktor")}</p>
            <p className={css.nameNameNew}>{t("constructorName")}</p>
            <p className={css.phoneDNew}>
              <MdLocalPhone className={css.mdLocalPhoneNew} />
              +380952236922
            </p>
            <p className={css.phoneDNew}>
              <MdEmail className={css.mdLocalPhoneNew} />
              lednik.insortex@gmail.com
            </p>
          </div>{" "}
          <div className={css.wrapOneUserNotNew}>
            <Image src={jakist} alt="insortex" className={css.imageUsersNew} />
            <p className={css.namePosadaNew}>{t("jakist")}</p>
            <p className={css.nameNameNew}>{t("jakistName")}</p>
            <p className={css.phoneDNew}>
              <MdLocalPhone className={css.mdLocalPhoneNew} />
              +380667556778
            </p>
            <p className={css.phoneDNew}>
              <MdEmail className={css.mdLocalPhoneNew} />
              kea.avator@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FirstBlockContact;

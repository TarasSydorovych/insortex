// import css from "./sendSmallForm.module.css";

// const SendSmallForm = ({ t, lng }) => {
//   return (
//     <div className={css.wrapSmallForm}>
//       <p className={css.pInSmallForm}>{t("titleSmallForm")}</p>

//       <form className={css.form}>
//         <input
//           type="text"
//           name="name"
//           placeholder={t("yourName")}
//           className={css.inputField}
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder={t("yourPhone")}
//           className={css.inputField}
//           required
//         />
//         <button type="submit" className={css.submitButton}>
//           {t("send")}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SendSmallForm;
"use client";

import { useState } from "react";
import css from "./sendSmallForm.module.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const translations = {
  ua: {
    titleSmallForm: "Залиште заявку",
    yourName: "Ваше ім'я",
    yourPhone: "Ваш телефон",
    send: "Відправити",
    errorMessage: "Будь ласка, заповніть усі поля.",
    successMessage: "Ваші дані успішно відправлено.",
    errorSendingMessage: "Не вдалося відправити дані. Спробуйте пізніше.",
  },
  en: {
    titleSmallForm: "Leave a request",
    yourName: "Your name",
    yourPhone: "Your phone",
    send: "Send",
    errorMessage: "Please fill in all fields.",
    successMessage: "Your data has been successfully sent.",
    errorSendingMessage: "Failed to send data. Please try again later.",
  },
  pl: {
    titleSmallForm: "Zostaw zgłoszenie",
    yourName: "Twoje imię",
    yourPhone: "Twój telefon",
    send: "Wyślij",
    errorMessage: "Proszę wypełnić wszystkie pola.",
    successMessage: "Twoje dane zostały pomyślnie wysłane.",
    errorSendingMessage:
      "Nie udało się wysłać danych. Spróbuj ponownie później.",
  },
  ru: {
    titleSmallForm: "Оставьте заявку",
    yourName: "Ваше имя",
    yourPhone: "Ваш телефон",
    send: "Отправить",
    errorMessage: "Пожалуйста, заполните все поля.",
    successMessage: "Ваши данные успешно отправлены.",
    errorSendingMessage: "Не удалось отправить данные. Попробуйте позже.",
  },
};

const SendSmallForm = ({ t }) => {
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const currentLang = translations[t] || translations["ua"]; // Визначаємо переклади залежно від мови

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      Swal.fire({
        icon: "error",
        title: currentLang.errorMessage,
        confirmButtonColor: "#f8b123",
      });
      return;
    }

    try {
      // Відправка даних через Email.js
      await emailjs.send(
        "service_f1pqzfa", // Замініть на свій Service ID
        "template_bohja9a", // Замініть на свій Template ID
        formData,
        "LgK5cN2Wp2rdCcUMr" // Замініть на свій Public Key
      );

      Swal.fire({
        icon: "success",
        title: currentLang.successMessage,
        confirmButtonColor: "#f8b123",
      });
      setFormData({ name: "", phone: "" });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: currentLang.errorSendingMessage,
        confirmButtonColor: "#f8b123",
      });
    }
  };

  return (
    <div className={css.wrapSmallForm}>
      <p className={css.pInSmallForm}>{currentLang.titleSmallForm}</p>

      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder={currentLang.yourName}
          className={css.inputField}
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder={currentLang.yourPhone}
          className={css.inputField}
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className={css.submitButton}>
          {currentLang.send}
        </button>
      </form>
    </div>
  );
};

export default SendSmallForm;

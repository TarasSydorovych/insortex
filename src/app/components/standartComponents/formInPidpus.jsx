// "use client";
// import { useState } from "react";
// import css from "./standart.module.css";
// const FormInPidpus = ({ t }) => {
//   const [email, setEmail] = useState("");
//   return (
//     <div className={css.wrapFormSubscribe}>
//       <input
//         className={css.emailAgro}
//         value={email}
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <div className={css.sendButtonSub}>Відправити</div>
//     </div>
//   );
// };
// export default FormInPidpus;
"use client";
import { useState } from "react";
import css from "./standart.module.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const translations = {
  ua: {
    placeholder: "Email",
    buttonText: "Відправити",
    successMessage: "Ваші дані успішно відправлено.",
    errorMessage: "Будь ласка, введіть коректний email.",
    errorSendingMessage: "Не вдалося відправити дані. Спробуйте пізніше.",
  },
  en: {
    placeholder: "Email",
    buttonText: "Send",
    successMessage: "Your data has been successfully sent.",
    errorMessage: "Please enter a valid email address.",
    errorSendingMessage: "Failed to send data. Please try again later.",
  },
  pl: {
    placeholder: "Email",
    buttonText: "Wyślij",
    successMessage: "Twoje dane zostały pomyślnie wysłane.",
    errorMessage: "Proszę podać poprawny adres email.",
    errorSendingMessage:
      "Nie udało się wysłać danych. Spróbuj ponownie później.",
  },
  ru: {
    placeholder: "Email",
    buttonText: "Отправить",
    successMessage: "Ваши данные успешно отправлены.",
    errorMessage: "Пожалуйста, введите корректный email.",
    errorSendingMessage: "Не удалось отправить данные. Попробуйте позже.",
  },
};

const FormInPidpus = ({ t }) => {
  const [email, setEmail] = useState("");
  const currentLang = translations[t] || translations["ua"]; // Вибір текстів залежно від мови

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: currentLang.errorMessage,
        confirmButtonColor: "#f8b123",
      });
      return;
    }

    try {
      await emailjs.send(
        "service_f1pqzfa", // Замініть на свій Service ID
        "template_n6kp0li", // Замініть на свій Template ID
        { email, topic: "Агророзвиток" }, // Поля для шаблона
        "LgK5cN2Wp2rdCcUMr" // Замініть на свій Public Key
      );

      Swal.fire({
        icon: "success",
        title: "Успішно",
        text: currentLang.successMessage,
        confirmButtonColor: "#f8b123",
      });
      setEmail(""); // Скидання поля
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка",
        text: currentLang.errorSendingMessage,
        confirmButtonColor: "#f8b123",
      });
    }
  };

  return (
    <div className={css.wrapFormSubscribe}>
      <input
        className={css.emailAgro}
        value={email}
        placeholder={currentLang.placeholder}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={css.sendButtonSub} onClick={handleSubmit}>
        {currentLang.buttonText}
      </div>
    </div>
  );
};

export default FormInPidpus;

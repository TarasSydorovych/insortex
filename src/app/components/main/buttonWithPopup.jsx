// "use client";
// import { useState } from "react";
// import css from "./buttonWithPopup.module.css";
// import Swal from "sweetalert2";
// import emailjs from "@emailjs/browser";

// const ButtonWithPopup = ({ buttonText, t }) => {
//   const [formData, setFormData] = useState({ name: "", phone: "" });
//   console.log("t", t);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.phone) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка",
//         text: "Будь ласка, заповніть усі поля.",
//       });
//       return;
//     }

//     try {
//       // Відправка даних через Email.js
//       await emailjs.send(
//         "YOUR_SERVICE_ID", // Замініть на свій Service ID
//         "YOUR_TEMPLATE_ID", // Замініть на свій Template ID
//         formData,
//         "YOUR_PUBLIC_KEY" // Замініть на свій Public Key
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Успішно",
//         text: "Ваші дані успішно відправлено.",
//       });
//       setFormData({ name: "", phone: "" }); // Скидання форми
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка",
//         text: "Не вдалося відправити дані. Спробуйте пізніше.",
//       });
//     }
//   };

//   const openPopup = () => {
//     Swal.fire({
//       title: "Розрахувати вартість",
//       html: `
//         <input type="text" id="name" class="swal2-input" placeholder="Ваше ім'я" />
//         <input type="tel" id="phone" class="swal2-input" placeholder="Ваш телефон" />
//       `,
//       focusConfirm: false,
//       preConfirm: () => {
//         const name = Swal.getPopup().querySelector("#name").value;
//         const phone = Swal.getPopup().querySelector("#phone").value;
//         if (!name || !phone) {
//           Swal.showValidationMessage("Будь ласка, заповніть усі поля");
//         }
//         return { name, phone };
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setFormData(result.value);
//         handleSubmit();
//       }
//     });
//   };

//   return (
//     <button className={css.buttonSendContact} onClick={openPopup}>
//       {buttonText}
//     </button>
//   );
// };

// export default ButtonWithPopup;

"use client";
import { useState } from "react";
import css from "./buttonWithPopup.module.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const translations = {
  ua: {
    title: "Розрахувати вартість",
    namePlaceholder: "Ваше ім'я",
    phonePlaceholder: "Ваш телефон",
    submitButton: "Відправити",
    errorMessage: "Будь ласка, заповніть усі поля.",
    successMessage: "Ваші дані успішно відправлено.",
    errorSendingMessage: "Не вдалося відправити дані. Спробуйте пізніше.",
    popupTitle: "Розрахувати вартість",
  },
  en: {
    title: "Calculate cost",
    namePlaceholder: "Your name",
    phonePlaceholder: "Your phone",
    submitButton: "Send",
    errorMessage: "Please fill in all fields.",
    successMessage: "Your data has been successfully sent.",
    errorSendingMessage: "Failed to send data. Please try again later.",
    popupTitle: "Calculate cost",
  },
  pl: {
    title: "Oblicz koszt",
    namePlaceholder: "Twoje imię",
    phonePlaceholder: "Twój telefon",
    submitButton: "Wyślij",
    errorMessage: "Proszę wypełnić wszystkie pola.",
    successMessage: "Twoje dane zostały pomyślnie wysłane.",
    errorSendingMessage:
      "Nie udało się wysłać danych. Spróbuj ponownie później.",
    popupTitle: "Oblicz koszt",
  },
  ru: {
    title: "Рассчитать стоимость",
    namePlaceholder: "Ваше имя",
    phonePlaceholder: "Ваш телефон",
    submitButton: "Отправить",
    errorMessage: "Пожалуйста, заполните все поля.",
    successMessage: "Ваши данные успешно отправлены.",
    errorSendingMessage: "Не удалось отправить данные. Попробуйте позже.",
    popupTitle: "Рассчитать стоимость",
  },
};

const ButtonWithPopup = ({ t }) => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const currentLang = translations[t] || translations["ua"]; // Вибір текстів залежно від мови

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (data) => {
    const submittedData = data || formData; // Якщо дані передані напряму, використовуємо їх

    if (!submittedData.name || !submittedData.phone) {
      console.warn("Validation failed: fields are missing.");
      Swal.fire({
        icon: "error",
        title: currentLang.errorMessage,
        confirmButtonColor: "#f8b123",
      });
      return;
    }

    try {
      const response = await emailjs.send(
        "service_f1pqzfa", // Ваш Service ID
        "template_bohja9a", // Ваш Template ID
        {
          name: submittedData.name,
          phone: submittedData.phone,
        },
        "LgK5cN2Wp2rdCcUMr" // Ваш Public Key
      );

      Swal.fire({
        icon: "success",
        title: currentLang.successMessage,
        confirmButtonColor: "#f8b123",
      });

      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Error during email sending:", error);
      Swal.fire({
        icon: "error",
        title: currentLang.errorSendingMessage,
        confirmButtonColor: "#f8b123",
      });
    }
  };

  const openPopup = () => {
    Swal.fire({
      title: currentLang.popupTitle,
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="${currentLang.namePlaceholder}" />
        <input type="tel" id="phone" class="swal2-input" placeholder="${currentLang.phonePlaceholder}" />
      `,
      focusConfirm: false,
      showCloseButton: true, // Вмикаємо хрестик для закриття
      confirmButtonText: currentLang.submitButton, // Текст кнопки
      confirmButtonColor: "#f8b123", // Колір кнопки
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value.trim();
        const phone = Swal.getPopup().querySelector("#phone").value.trim();

        if (!name || !phone) {
          Swal.showValidationMessage(currentLang.errorMessage);
          return null;
        }
        return { name, phone };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { name, phone } = result.value;

        // Оновлюємо стан і одразу викликаємо handleSubmit з правильними значеннями
        setFormData({ name, phone });
        handleSubmit({ name, phone });
      }
    });
  };

  return (
    <button className={css.buttonSendContact} onClick={openPopup}>
      {currentLang.title}
    </button>
  );
};

export default ButtonWithPopup;

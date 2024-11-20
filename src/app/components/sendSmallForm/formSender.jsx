import css from "./sendSmallForm.module.css";

const FormSender = () => {
  return (
    <div className={css.formSenderWrap}>
      <form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="name">Ім'я</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="email">Пошта</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="phone">Телефон</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="message">Повідомлення</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit" className={css.submitButton}>
          Відправити
        </button>
      </form>
    </div>
  );
};

export default FormSender;

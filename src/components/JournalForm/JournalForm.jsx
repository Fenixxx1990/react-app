import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import cn from "classnames";

export default function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isValid = true;
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isValid) {
      return;
    }

    onSubmit(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(styles["input-title"], {
            [styles.invalid]: !formValidState.title,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-lable"]}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          id="date"
          type="date"
          name="date"
          className={cn(styles["input"], {
            [styles.invalid]: !formValidState.date,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-lable"]}>
          <img src="/folder-icon.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input type="text" id="tag" name="tag" className={styles.input} />
      </div>

      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        className={cn(styles["input"], {
          [styles.invalid]: !formValidState.text,
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

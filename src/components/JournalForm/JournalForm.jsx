import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

export default function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.date) {
      timerId = setTimeout(() => {
        console.log("Очистка состояния");
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
    }
  }, [isFormReadyToSubmit]);

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: "SUBMIT", payload: formProps });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(styles["input-title"], {
            [styles.invalid]: !isValid.title,
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
            [styles.invalid]: !isValid.date,
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
          [styles.invalid]: !isValid.text,
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

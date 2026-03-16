import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

export default function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.date) {
      focusError(isValid);
      timerId = setTimeout(() => {
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
      dispatchForm({ type: "RESET" });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value, userId },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <Input
          type="text"
          name="title"
          isValid={isValid.title}
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          appearence="title"
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-lable"]}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <Input
          id="date"
          type="date"
          ref={dateRef}
          isValid={isValid.date}
          onChange={onChange}
          value={values.date}
          name="date"
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-lable"]}>
          <img src="/folder-icon.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <Input
          type="text"
          onChange={onChange}
          value={values.tag}
          id="tag"
          name="tag"
        />
      </div>

      <textarea
        name="text"
        id="text"
        cols="30"
        rows="10"
        ref={textRef}
        onChange={onChange}
        value={values.text}
        className={cn(styles["input"], {
          [styles.invalid]: !isValid.text,
        })}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
}

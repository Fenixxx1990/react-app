import "./Button.css";
import { useState } from "react";

export default function Button() {
  // let text = "Сохранить";
  const [text, setText] = useState("Сохранить");
  const clicked = () => {
    setText("Закрыть");
    console.log(text);
  };
  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  );
}

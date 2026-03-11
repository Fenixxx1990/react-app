import "./Button.css";

export default function Button({ text, onClick }) {
  return (
    <button className="button accent" onClick={onClick}>
      {text}
    </button>
  );
}

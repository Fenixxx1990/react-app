import "./Button.css";

export default function Button({ children, onClick }) {
  return (
    <button className="button accent" onClick={onClick}>
      {children}
    </button>
  );
}

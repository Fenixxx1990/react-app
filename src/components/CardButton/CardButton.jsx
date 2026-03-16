import "./CardButton.css";

export default function CardButton({ children, className, ...props }) {
  const cl = "card-button" + (className ? " " + className : "");
  return (
    <button {...props} className={cl}>
      {children}
    </button>
  );
}

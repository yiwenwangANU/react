import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  console.log(children);
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  return (
    <button
      type="submit"
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

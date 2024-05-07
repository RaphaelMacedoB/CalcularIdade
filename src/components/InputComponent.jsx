// InputComponent.js
import React from "react";
import styles from "./InputComponent.module.css";

const InputComponent = ({
  label,
  value,
  placeholder,
  length,
  onChange,
  error,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={length}
        onChange={onChange}
        className={error ? styles.errorInput : ""}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default InputComponent;

import React from "react";
import { useError } from "contexts/CreationErrorContext";
import styles from "./TextInput.module.css";
import { useDarkMode } from "contexts/DarkModeContext";
import { EInputType } from "./InputType";

type TextInputProps = {
  type: EInputType;
  placeholder: string;
  setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: React.RefObject<HTMLInputElement>;
};

function TextInput({
  type,
  placeholder,
  setInputValue,
  inputValue,
}: TextInputProps) {
  const { darkMode } = useDarkMode();

  const conditionalClass =
    placeholder === "Username" || placeholder === "Password"
      ? styles.formInput
      : darkMode
      ? styles.formInput
      : `${styles.formInput} ${styles.darkColor}`;

  return (
    <input
      placeholder={placeholder}
      type={type}
      className={conditionalClass}
      ref={inputValue}
      onChange={setInputValue}
    />
  );
}

export default TextInput;

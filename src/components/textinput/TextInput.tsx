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
  const { error } = useError();
  const { darkMode } = useDarkMode();
  return (
    <div className={styles.addFormContainer}>
      {error != "" && <p className={styles.addFormError}>{error}</p>}
      <label htmlFor="addform_content" className={styles.addFormLabel}>
        {placeholder}
      </label>
      <input
        id="addform_content"
        type={type}
        onChange={setInputValue}
        className={
          darkMode ? `${styles.addFormDarkInput}` : styles.addFormInput
        }
        ref={inputValue}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;

import React from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  placeholder: string;
  setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: React.RefObject<HTMLInputElement>;
};

function TextInput({ placeholder, setInputValue, inputValue }: TextInputProps) {
  return (
    <div className={styles.addform_container}>
      <label htmlFor="addform_content" className={styles.addform_label}>
        {placeholder}
      </label>
      <input
        id="addform_content"
        type="text"
        onChange={setInputValue}
        className={styles.addform_input}
        ref={inputValue}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;

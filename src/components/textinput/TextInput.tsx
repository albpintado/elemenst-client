import React from "react";
import { useError } from "contexts/CreationErrorContext";
import styles from "./TextInput.module.css";

type TextInputProps = {
  placeholder: string;
  setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: React.RefObject<HTMLInputElement>;
};

function TextInput({ placeholder, setInputValue, inputValue }: TextInputProps) {
  const { error } = useError();
  return (
    <div className={styles.addform_container}>
      {error != "" && (
        <p className={styles.addform_invalidInputError}>{error}</p>
      )}
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

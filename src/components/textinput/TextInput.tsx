import React from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  placeholder: string;
  setItemContent: (newValue: string) => void;
  itemContent: string;
};

function TextInput({
  placeholder,
  itemContent: newItem,
  setItemContent: setState,
}: TextInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(value);
  };

  return (
    <div className={styles.addform_container}>
      <label htmlFor="addform_content" className={styles.addform_label}>
        New item
      </label>
      <input
        id="addform_content"
        type="text"
        onChange={onChange}
        className={styles.addform_input}
        value={newItem}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;

import React from "react";
import styles from "./ListTitleEditing.module.css";
import { useDarkMode } from "contexts/DarkModeContext";
import SaveButton from "components/savebutton/SaveButton";
import CancelButton from "components/cancelbutton/CancelButton";

interface ListTitleEditingProps {
  text: string;
  isEditingHandler: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

function ListTitleEditing({
  text,
  isEditingHandler,
  onChange,
  onSave,
}: ListTitleEditingProps) {
  const { darkMode } = useDarkMode();

  const lightModeClasses = `${styles.listEditFormInput}`;
  const darkModeClasses = `${styles.dark} ${styles.listEditFormInput}`;
  const conditionalClasses = darkMode ? darkModeClasses : lightModeClasses;

  return (
    <div className={styles.listEditForm}>
      <SaveButton onSave={onSave} />
      <CancelButton isEditingHandler={isEditingHandler} />
      <input
        type="text"
        value={text}
        onChange={onChange}
        className={conditionalClasses}
      />
    </div>
  );
}

export default ListTitleEditing;

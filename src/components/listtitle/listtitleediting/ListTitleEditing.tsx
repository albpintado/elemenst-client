import React from "react";
import styles from "./ListTitleEditing.module.css";
import CancelIcon from "components/cancelicon/CancelIcon";
import SaveIcon from "components/saveicon/SaveIcon";

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
  return (
    <div className={styles.listEditForm}>
      <button className={styles.listEditForm_editIcon} onClick={onSave}>
        <SaveIcon />
      </button>
      <button
        className={styles.listEditForm_editIcon}
        onClick={isEditingHandler}
      >
        <CancelIcon />
      </button>
      <input
        type="text"
        value={text}
        onChange={onChange}
        className={styles.listEditForm_editInput}
      />
    </div>
  );
}

export default ListTitleEditing;

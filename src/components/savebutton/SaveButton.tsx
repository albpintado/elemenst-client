import React from "react";
import SaveIcon from "./SaveIcon";
import styles from "./SaveButton.module.css";
import { useDarkMode } from "contexts/DarkModeContext";

interface SaveButtonProps {
  onSave: () => void;
}

function SaveButton({ onSave }: SaveButtonProps) {
  const { darkMode } = useDarkMode();

  const lightModeClasses = `${styles.listEditFormIcon}`;
  const darkModeClasses = `${styles.dark} ${styles.listEditFormIcon}`;
  const conditionalClasses = darkMode ? darkModeClasses : lightModeClasses;

  return (
    <button className={conditionalClasses} onClick={onSave}>
      <SaveIcon />
    </button>
  );
}

export default SaveButton;

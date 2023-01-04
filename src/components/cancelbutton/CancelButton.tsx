import React from "react";
import CancelIcon from "./CancelIcon";
import styles from "./CancelButton.module.css";
import { useDarkMode } from "contexts/DarkModeContext";

interface CancelButtonProps {
  isEditingHandler: () => void;
}

function CancelButton({ isEditingHandler }: CancelButtonProps) {
  const { darkMode } = useDarkMode();

  const lightModeClasses = `${styles.cancelButton}`;
  const darkModeClasses = `${styles.dark} ${styles.cancelButton}`;
  const conditionalClasses = darkMode ? darkModeClasses : lightModeClasses;

  return (
    <button className={conditionalClasses} onClick={isEditingHandler}>
      <CancelIcon />
    </button>
  );
}

export default CancelButton;

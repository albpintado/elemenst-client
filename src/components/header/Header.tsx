import React from "react";
import { useDarkMode } from "contexts/DarkModeContext";
import styles from "./Header.module.css";

function Header() {
  const { darkMode } = useDarkMode();

  return (
    <h2
      className={
        darkMode
          ? `${styles.noItemsHeader} ${styles.dark}`
          : styles.noItemsHeader
      }
    >
      No lists
    </h2>
  );
}

export default Header;

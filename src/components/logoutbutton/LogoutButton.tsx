import React from "react";
import LogoutIcon from "./LogoutIcon";
import styles from "./LogoutButton.module.css";

interface LogoutButtonProps {
  onLogout: () => void;
}

function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button className={styles.logoutButton} onClick={onLogout}>
      <LogoutIcon />
    </button>
  );
}

export default LogoutButton;

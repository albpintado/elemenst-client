import React from "react";
import styles from "./ErrorMessage.module.css";
import { useError } from "contexts/CreationErrorContext";

function ErrorMessage() {
  const { error } = useError();

  return error != "" ? (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  ) : (
    <></>
  );
}

export default ErrorMessage;

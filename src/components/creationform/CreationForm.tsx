import React from "react";
import styles from "./CreationForm.module.css";
import TextInput from "components/textinput";
import { EInputType } from "components/textinput/InputType";

interface CreationFormProps {
  onCreate: (event: React.FormEvent) => void;
  text: string;
  inputValue: React.RefObject<HTMLInputElement>;
  setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CreationForm({
  onCreate,
  text,
  inputValue,
  setInputValue,
}: CreationFormProps) {
  return (
    <form className={styles.form} onSubmit={onCreate}>
      <TextInput
        type={EInputType.TEXT}
        placeholder={text}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </form>
  );
}

export default CreationForm;

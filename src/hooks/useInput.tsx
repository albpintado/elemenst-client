import React, { useRef } from "react";

function useInput() {
  const inputValue = useRef<HTMLInputElement>(null);

  const setInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputValue.current) {
      inputValue.current.value = event.target.value;
    }
  };

  const resetInputValue = () => {
    if (inputValue.current) {
      inputValue.current.value = "";
    }
  };

  return { inputValue, setInputValue, resetInputValue };
}

export default useInput;

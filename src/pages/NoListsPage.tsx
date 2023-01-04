import React, { useContext, useState } from "react";
import TextInput from "components/textinput";
import { TLineList } from "components/linelist/LineList.type";
import { createList, LineListsContext } from "contexts/LineListContext";
import useInput from "hooks/useInput";
import { useDarkMode } from "contexts/DarkModeContext";
import Header from "components/header/Header";

interface HomePageProps {
  setCurrentList: (list: TLineList) => void;
}

function NoListsPage({ setCurrentList }: HomePageProps) {
  const { lineListsDispatch } = useContext(LineListsContext);
  const { inputValue, setInputValue, resetInputValue } = useInput();

  const onCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.current) {
      createList(
        lineListsDispatch,
        inputValue.current.value,
        setCurrentList,
        resetInputValue
      );
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={onCreate}>
        <TextInput
          placeholder="Create new list"
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </form>
    </>
  );
}

export default NoListsPage;

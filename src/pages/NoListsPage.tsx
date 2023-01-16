import React from "react";
import { TLineList } from "components/linelist/LineList.type";
import { createList, useLineLists } from "contexts/LineListContext";
import useInput from "hooks/useInput";
import Header from "components/header/Header";
import { useError } from "contexts/CreationErrorContext";
import ErrorMessage from "components/errormessage/ErrorMessage";
import CreationForm from "components/creationform/CreationForm";

interface HomePageProps {
  setCurrentList: (list: TLineList) => void;
}

function NoListsPage({ setCurrentList }: HomePageProps) {
  const { lineListsDispatch } = useLineLists();
  const { setError } = useError();

  const { inputValue, setInputValue, resetInputValue } = useInput();

  const onCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.current) {
      const { data, status } = await createList(
        lineListsDispatch,
        inputValue.current.value,
        setCurrentList,
        resetInputValue
      );

      if (status == 422) {
        setError(data as string);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  return (
    <>
      <Header />
      <ErrorMessage />
      <CreationForm
        onCreate={onCreate}
        text="Add new list"
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </>
  );
}

export default NoListsPage;

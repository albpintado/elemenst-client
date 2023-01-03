import React, { useEffect } from "react";
import LineList from "components/linelist";
import { TLineList } from "components/linelist/LineList.type";
import ListTitle from "components/listtitle/ListTitle";
import TextInput from "components/textinput";
import { createList, useLineLists } from "contexts/LineListContext";
import useInput from "hooks/useInput";
import {
  createLineItem,
  getAllLineItems,
  useLineItems,
} from "contexts/LineItemContext";
import { useError } from "contexts/CreationErrorContext";

type ListPageProps = {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
};

function ListPage({ currentList, setCurrentList }: ListPageProps) {
  const { lineItemsDispatch } = useLineItems();
  const { lineListsDispatch } = useLineLists();

  const { inputValue, setInputValue, resetInputValue } = useInput();

  const { setError } = useError();

  useEffect(() => {
    getAllLineItems(lineItemsDispatch, currentList);
  }, [currentList]);

  const onCreateList = async (event: React.FormEvent) => {
    if (inputValue.current) {
      event.preventDefault();
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

  const onCreateItem = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentList != undefined && inputValue.current) {
      const { data, status } = await createLineItem(
        lineItemsDispatch,
        currentList,
        inputValue.current.value,
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
      <ListTitle currentList={currentList} setCurrentList={setCurrentList} />
      <form onSubmit={currentList == undefined ? onCreateList : onCreateItem}>
        <TextInput
          placeholder={
            currentList == undefined ? "Add new list" : "Add new item"
          }
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </form>
      <LineList currentList={currentList} />
    </>
  );
}

export default ListPage;

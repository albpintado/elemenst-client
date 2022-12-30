import React, { useEffect } from "react";
import LineList from "components/linelist";
import { TLineList } from "components/linelist/LineList.type";
import ListTitle from "components/listtitle/ListTitle";
import TextInput from "components/textinput";
import { createList, useLineLists } from "components/linelist/LineListContext";
import useInput from "hooks/useInput";
import {
  createLineItem,
  getAllLineItems,
  useLineItems,
} from "components/lineitem/LineItemContext";

type ListPageProps = {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
};

function ListPage({ currentList, setCurrentList }: ListPageProps) {
  const { lineItemsDispatch } = useLineItems();
  const { lineListsDispatch } = useLineLists();

  const { inputValue, setInputValue, resetInputValue } = useInput();

  useEffect(() => {
    getAllLineItems(lineItemsDispatch, currentList);
  }, [currentList]);

  const onCreateList = async (event: React.FormEvent) => {
    if (inputValue.current) {
      event.preventDefault();
      createList(
        lineListsDispatch,
        inputValue.current.value,
        setCurrentList,
        resetInputValue
      );
    }
  };

  const onCreateItem = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentList != undefined && inputValue.current) {
      createLineItem(
        lineItemsDispatch,
        currentList,
        inputValue.current.value,
        resetInputValue
      );
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

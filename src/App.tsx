import React, { useEffect, useState } from "react";
import "./App.css";

import ListPage from "./pages/ListPage";

import ListsService from "./lists.service";

import { TLineList } from "components/linelist/LineList.type";
import { TLineItem } from "components/lineitem/LineItem.type";
import Navbar from "components/navbar";
import { LineListDto } from "components/linelist/LineItem.dto";
import HomePage from "pages/HomePage";

function App() {
  const [currentList, setCurrentList] = useState<TLineList>();
  const [lineLists, setLineLists] = useState<TLineList[]>([]);
  const [lineItems, setLineItems] = useState<TLineItem[]>([]);
  const [itemContent, setItemContent] = useState<string>("");

  useEffect(() => {
    const fetchLists = async () => {
      const listsResponse = await ListsService.getAllLists();
      setLineLists(listsResponse);
    };
    fetchLists();
  }, [currentList]);

  const createList = async (event: React.FormEvent) => {
    event.preventDefault();
    const creationDate = new Date().toLocaleDateString("en-CA").split(",")[0];
    const listToSave: LineListDto = {
      name: itemContent,
      creationDate: creationDate,
    };

    const savedList = await ListsService.createList(listToSave);
    const newLists = [...lineLists, savedList];
    setLineLists(newLists);
    setCurrentList(savedList);
    setItemContent("");
  };

  const updateList = async (listId: number, newName: string) => {
    const savedList = await ListsService.updateList(listId, newName);
    const newLists = lineLists.map((list) => {
      if (list.id == listId) {
        list.name = savedList.name;
      }
      return list;
    });
    setLineLists(newLists);
  };

  const deleteList = async (listId: number) => {
    await ListsService.deleteList(listId);
    const newLists = lineLists.filter((list) => list.id != listId);
    setLineLists(newLists);
  };

  const onClickTitle = () => {
    setCurrentList(undefined);
  };

  const onClickList = (listName: string) => {
    const fetchItems = async () => {
      const list = lineLists.find((list) => list.name == listName);
      if (list != undefined) {
        setCurrentList(list);
      }
    };
    fetchItems();
  };

  return (
    <>
      <div className="wrapper">
        <Navbar
          lineLists={lineLists}
          onClickTitle={onClickTitle}
          onClickList={onClickList}
        />
        <main>
          {lineLists.length == 0 && (
            <HomePage
              createList={createList}
              itemContent={itemContent}
              setItemContent={setItemContent}
            />
          )}
          {lineLists.length > 0 && (
            <ListPage
              currentList={currentList}
              setCurrentList={setCurrentList}
              itemContent={itemContent}
              setItemContent={setItemContent}
              createList={createList}
              updateList={updateList}
              deleteList={deleteList}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;

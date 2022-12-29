import React, { useEffect, useState } from "react";
import { TLineItem } from "components/lineitem/LineItem.type";
import LineList from "components/linelist";
import { TLineList } from "components/linelist/LineList.type";
import ItemsService from "items.service";
import ListTitle from "components/listtitle/ListTitle";
import TextInput from "components/textinput";
import { LineItemDto } from "components/lineitem/LineItem.dto";

type ListPageProps = {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
  itemContent: string;
  setItemContent: (item: string) => void;
  createList: (event: React.FormEvent) => void;
  updateList: (listId: number, newContent: string) => void;
  deleteList: (listId: number) => void;
};

function ListPage({
  currentList,
  setCurrentList,
  itemContent,
  setItemContent,
  createList,
  updateList,
  deleteList,
}: ListPageProps) {
  const [lineItems, setLineItems] = useState<TLineItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (currentList != undefined) {
        const itemsResponse = await ItemsService.getAllItemsByLineList(
          currentList.id
        );
        setLineItems(itemsResponse);
      } else {
        const itemsResponse = await ItemsService.getAllItems();
        setLineItems(itemsResponse);
      }
    };
    fetchItems();
  }, [currentList]);

  const createItem = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentList != undefined) {
      const creationDate = new Date().toLocaleDateString("en-CA").split(",")[0];
      const itemToSave: LineItemDto = {
        content: itemContent,
        creationDate: creationDate,
        lineListId: currentList.id,
      };

      const savedItem = await ItemsService.createItem(itemToSave);
      const newItems = [savedItem, ...lineItems];
      setLineItems(newItems);
      setItemContent("");
    }
  };

  const completeItem = async (itemId: number) => {
    await ItemsService.completeItem(itemId);
    const newItems = lineItems.map((item) => {
      if (item.id == itemId) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setLineItems(newItems);
  };

  const updateItem = async (itemId: number, newContent: string) => {
    const savedItem = await ItemsService.updateItem(itemId, newContent);
    const newItems = lineItems.map((item) => {
      if (item.id == itemId) {
        item.content = savedItem.content;
      }
      return item;
    });
    setLineItems(newItems);
  };

  const deleteItem = async (itemId: number) => {
    await ItemsService.deleteItem(itemId);
    const newItems = lineItems.filter((item) => item.id != itemId);
    setLineItems(newItems);
  };

  return (
    <>
      <ListTitle
        currentList={currentList}
        setCurrentList={setCurrentList}
        updateList={updateList}
        deleteList={deleteList}
      />
      <form onSubmit={currentList == undefined ? createList : createItem}>
        <TextInput
          placeholder={
            currentList == undefined ? "Create new list" : "Add new item"
          }
          itemContent={itemContent}
          setItemContent={setItemContent}
        />
      </form>
      <LineList
        currentList={currentList}
        lineItems={lineItems}
        completeItem={completeItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
    </>
  );
}

export default ListPage;

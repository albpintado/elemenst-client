import React, { useState } from "react";
import { TLineItem } from "components/lineitem/LineItem.type";
import LineItem from "components/lineitem";
import styles from "./LineList.module.css";
import { TLineList } from "./LineList.type";

interface LineListProps {
  currentList: TLineList | undefined;
  lineItems: TLineItem[];
  completeItem: (itemId: number) => void;
  updateItem: (itemId: number, newContent: string) => void;
  deleteItem: (itemId: number) => void;
}

function LineList({
  currentList,
  lineItems,
  completeItem,
  updateItem,
  deleteItem,
}: LineListProps) {
  return lineItems.length == 0 ? (
    <section>
      <p className={styles.noItemsText}>No items</p>
    </section>
  ) : (
    <section className={styles.lineList}>
      {lineItems.map((item) => {
        return (
          <LineItem
            key={"Item n." + item.id}
            currentList={currentList}
            item={item}
            completeItem={completeItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        );
      })}
    </section>
  );
}

export default LineList;

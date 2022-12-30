import React from "react";
import LineItem from "components/lineitem";
import styles from "./LineList.module.css";
import { TLineList } from "./LineList.type";
import { useLineItems } from "components/lineitem/LineItemContext";

interface LineListProps {
  currentList: TLineList | undefined;
}

function LineList({ currentList }: LineListProps) {
  const { lineItemsState } = useLineItems();

  return lineItemsState.lineItems.length == 0 ? (
    <section>
      <p className={styles.noItemsText}>No items</p>
    </section>
  ) : (
    <section className={styles.lineList}>
      {lineItemsState.lineItems.map((item) => {
        return (
          <LineItem
            key={"Item n." + item.id}
            currentList={currentList}
            item={item}
          />
        );
      })}
    </section>
  );
}

export default LineList;

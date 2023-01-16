import React from "react";
import LineItem from "components/lineitem";
import styles from "./LineList.module.css";
import { TLineList } from "./LineList.type";
import { useLineItems } from "contexts/LineItemContext";
import { useDarkMode } from "contexts/DarkModeContext";

interface LineListProps {
  currentList: TLineList | undefined;
}

function LineList({ currentList }: LineListProps) {
  const { lineItemsState } = useLineItems();
  const { darkMode } = useDarkMode();

  // Sort line items putting all completed items at the bottom, sorted by item id
  const sortedLineItems = lineItemsState.lineItems.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1;
    } else if (!a.isCompleted && b.isCompleted) {
      return -1;
    } else {
      return a.id - b.id;
    }
  });

  return lineItemsState.lineItems.length == 0 ? (
    <section>
      <p
        className={
          darkMode
            ? `${styles.noItemsText} ${styles.lightText}`
            : styles.noItemsText
        }
      >
        No items
      </p>
    </section>
  ) : (
    <section
      className={
        darkMode
          ? `${styles.lineList} ${styles.dark}`
          : `${styles.lineList} ${styles.light}`
      }
    >
      {sortedLineItems.map((item) => {
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

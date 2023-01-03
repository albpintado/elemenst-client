import React, { useState } from "react";
import { TLineItem } from "./LineItem.type";
import styles from "./LineItem.module.css";
import EditIcon from "../editicon/EditIcon";
import TrashIcon from "components/trashicon/TrashIcon";
import SaveIcon from "components/saveicon/SaveIcon";
import ConfirmTrashIcon from "components/confirmtrashicon/ConfirmTrashIcon";
import CancelIcon from "components/cancelicon/CancelIcon";
import { TLineList } from "components/linelist/LineList.type";
import {
  completeLineItem,
  deleteLineItem,
  updateLineItem,
  useLineItems,
} from "../../contexts/LineItemContext";
import { useError } from "contexts/CreationErrorContext";
import { useDarkMode } from "contexts/DarkModeContext";

interface LineItemProps {
  currentList: TLineList | undefined;
  item: TLineItem;
}

function LineItem({ currentList, item }: LineItemProps) {
  const { lineItemsDispatch } = useLineItems();
  const { setError } = useError();
  const { darkMode } = useDarkMode();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemContent, setItemContent] = useState(item.content);

  const onComplete = async (item: TLineItem) => {
    completeLineItem(lineItemsDispatch, item);
  };

  const onUpdate = async () => {
    const { data, status } = await updateLineItem(
      lineItemsDispatch,
      item,
      itemContent
    );
    if (status == 422) {
      setError(data as string);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deleteLineItem(lineItemsDispatch, item);
    setIsDeleting(!isDeleting);
  };

  const toggleEditingStatus = () => {
    setItemContent(item.content);
    setIsEditing(!isEditing);
  };

  const toggleDeletingStatus = () => {
    setIsDeleting(!isDeleting);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setItemContent(value);
  };

  const leftButtonSlot = isEditing ? (
    <button
      className={darkMode ? `${styles.darkIcon} ${styles.icon}` : styles.icon}
      onClick={onUpdate}
    >
      <SaveIcon />
    </button>
  ) : isDeleting ? (
    <button
      className={darkMode ? `${styles.darkIcon} ${styles.icon}` : styles.icon}
      onClick={toggleDeletingStatus}
    >
      <CancelIcon />
    </button>
  ) : (
    <button
      className={darkMode ? `${styles.darkIcon} ${styles.icon}` : styles.icon}
      onClick={toggleEditingStatus}
    >
      <EditIcon />
    </button>
  );

  const rightButtonSlot = isDeleting ? (
    <button
      className={`${styles.icon} ${styles.rightIcon} ${styles.confirmTrashIcon}`}
      onClick={onDelete}
    >
      <ConfirmTrashIcon />
    </button>
  ) : isEditing ? (
    <button
      className={
        darkMode
          ? `${styles.darkIcon} ${styles.icon} ${styles.rightIcon}`
          : `${styles.icon} ${styles.rightIcon}`
      }
      onClick={toggleEditingStatus}
    >
      <CancelIcon />
    </button>
  ) : (
    <button
      className={
        darkMode
          ? `${styles.darkIcon} ${styles.icon} ${styles.rightIcon}`
          : `${styles.icon} ${styles.rightIcon}`
      }
      onClick={toggleDeletingStatus}
    >
      <TrashIcon />
    </button>
  );

  return (
    <article
      key={"Item n." + item.id}
      className={darkMode ? styles.darkLineItemCard : styles.lightLineItemCard}
    >
      <input
        type="checkbox"
        className={styles.lineitem_checkbox}
        defaultChecked={item.isCompleted ? true : false}
        onClick={() => onComplete(item)}
      />
      {isEditing ? (
        <div className={styles.lineitem_contentForm}>
          <input
            type="text"
            value={itemContent}
            onChange={onChangeContent}
            className={
              darkMode ? styles.darkContentInput : styles.lightContentInput
            }
          />
        </div>
      ) : (
        <section className={styles.lineitem_itemTexts}>
          <p
            className={`${styles.lineitem_content} ${
              item.isCompleted ? styles.lineitem_contentCompleted : ""
            }`}
          >
            {item.content}
          </p>
          {currentList == undefined && (
            <p className={styles.lineitem_listName}>{item.lineList.name}</p>
          )}
        </section>
      )}
      {leftButtonSlot}
      {rightButtonSlot}
    </article>
  );
}

export default LineItem;

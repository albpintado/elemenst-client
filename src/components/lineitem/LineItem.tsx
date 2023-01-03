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

interface LineItemProps {
  currentList: TLineList | undefined;
  item: TLineItem;
}

function LineItem({ currentList, item }: LineItemProps) {
  const { lineItemsDispatch } = useLineItems();
  const { setError } = useError();

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
    <button className={styles.lineitem_editIcon} onClick={onUpdate}>
      <SaveIcon />
    </button>
  ) : isDeleting ? (
    <button className={styles.lineitem_editIcon} onClick={toggleDeletingStatus}>
      <CancelIcon />
    </button>
  ) : (
    <button className={styles.lineitem_editIcon} onClick={toggleEditingStatus}>
      <EditIcon />
    </button>
  );

  const rightButtonSlot = isDeleting ? (
    <button
      className={`${styles.lineitem_trashIcon} ${styles.lineitem_confirmTrashIcon}`}
      onClick={onDelete}
    >
      <ConfirmTrashIcon />
    </button>
  ) : isEditing ? (
    <button className={styles.lineitem_trashIcon} onClick={toggleEditingStatus}>
      <CancelIcon />
    </button>
  ) : (
    <button
      className={styles.lineitem_trashIcon}
      onClick={toggleDeletingStatus}
    >
      <TrashIcon />
    </button>
  );

  return (
    <article key={"Item n." + item.id} className={styles.lineitem_card}>
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
            className={styles.lineitem_contentInput}
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

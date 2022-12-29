import React, { useState } from "react";
import { TLineItem } from "./LineItem.type";
import styles from "./LineItem.module.css";
import EditIcon from "../editicon/EditIcon";
import TrashIcon from "components/trashicon/TrashIcon";
import SaveIcon from "components/saveicon/SaveIcon";
import ConfirmTrashIcon from "components/confirmtrashicon/ConfirmTrashIcon";
import CancelIcon from "components/cancelicon/CancelIcon";
import { TLineList } from "components/linelist/LineList.type";

interface LineItemProps {
  currentList: TLineList | undefined;
  item: TLineItem;
  completeItem: (itemId: number) => void;
  updateItem: (itemId: number, newContent: string) => void;
  deleteItem: (itemId: number) => void;
}

function LineItem({
  currentList,
  item,
  completeItem,
  updateItem,
  deleteItem,
}: LineItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemContent, setItemContent] = useState(item.content);

  const isEditingHandler = () => {
    setItemContent(item.content);
    setIsEditing(!isEditing);
  };

  const isDeletingHandler = () => {
    setIsDeleting(!isDeleting);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setItemContent(value);
  };

  const onSave = () => {
    updateItem(item.id, itemContent);
    setIsEditing(!isEditing);
  };

  const onDelete = () => {
    deleteItem(item.id);
    setIsDeleting(!isDeleting);
  };

  const leftButtonSlot = isEditing ? (
    <button className={styles.lineitem_editIcon} onClick={onSave}>
      <SaveIcon />
    </button>
  ) : isDeleting ? (
    <button className={styles.lineitem_editIcon} onClick={isDeletingHandler}>
      <CancelIcon />
    </button>
  ) : (
    <button className={styles.lineitem_editIcon} onClick={isEditingHandler}>
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
    <button className={styles.lineitem_trashIcon} onClick={isEditingHandler}>
      <CancelIcon />
    </button>
  ) : (
    <button className={styles.lineitem_trashIcon} onClick={isDeletingHandler}>
      <TrashIcon />
    </button>
  );

  return (
    <article key={"Item n." + item.id} className={styles.lineitem_card}>
      <input
        type="checkbox"
        className={styles.lineitem_checkbox}
        defaultChecked={item.isCompleted ? true : false}
        onClick={() => completeItem(item.id)}
      />
      {isEditing ? (
        <div className={styles.lineitem_contentForm}>
          <input
            type="text"
            value={itemContent}
            onChange={onChange}
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

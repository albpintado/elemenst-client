import React, { useEffect, useState } from "react";
import { TLineList } from "components/linelist/LineList.type";
import styles from "./ListTitle.module.css";
import SaveIcon from "components/saveicon/SaveIcon";
import CancelIcon from "components/cancelicon/CancelIcon";
import ListTitleEditing from "./listtitleediting/ListTitleEditing";
import TrashIcon from "components/trashicon/TrashIcon";
import ConfirmTrashIcon from "components/confirmtrashicon/ConfirmTrashIcon";
import EditIcon from "components/editicon/EditIcon";
import {
  deleteList,
  updateList,
  useLineLists,
} from "components/linelist/LineListContext";

interface ListTitleProps {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
}

function ListTitle({ currentList, setCurrentList }: ListTitleProps) {
  const { lineListsState, lineListsDispatch } = useLineLists();
  const originalTitle = currentList?.name;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (currentList != undefined) {
      setIsEditing(false);
      setText(currentList.name);
    }
  }, [currentList]);

  const toggleEditingStatus = () => {
    setIsEditing(!isEditing);
    setText(originalTitle || "");
  };

  const toggleDeletingStatus = () => {
    setIsDeleting(!isDeleting);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
  };

  const onUpdate = async () => {
    if (currentList) {
      updateList(lineListsDispatch, currentList, text);
      setIsEditing(!isEditing);
    }
  };

  const onDelete = () => {
    if (currentList != undefined) {
      deleteList(currentList, lineListsState, lineListsDispatch);
      setCurrentList(undefined);
    }
  };

  const rightButtonSlot = isEditing ? (
    <button className={styles.deleteButton} onClick={onUpdate}>
      <SaveIcon />
    </button>
  ) : isDeleting ? (
    <button className={styles.deleteButton} onClick={toggleDeletingStatus}>
      <CancelIcon />
    </button>
  ) : (
    <button className={styles.deleteButton} onClick={toggleEditingStatus}>
      <EditIcon />
    </button>
  );

  const leftButtonSlot = isDeleting ? (
    <button
      className={`${styles.deleteButton} ${styles.lineitem_confirmTrashIcon}`}
      onClick={onDelete}
    >
      <ConfirmTrashIcon />
    </button>
  ) : isEditing ? (
    <button className={styles.deleteButton} onClick={toggleEditingStatus}>
      <CancelIcon />
    </button>
  ) : (
    <button className={styles.deleteButton} onClick={toggleDeletingStatus}>
      <TrashIcon />
    </button>
  );

  if (currentList == undefined) {
    return (
      <div className={styles.listTitleContainer}>
        <h3 className={styles.listTitle}>All items</h3>
      </div>
    );
  }

  if (isEditing) {
    return (
      <ListTitleEditing
        text={text}
        isEditingHandler={toggleEditingStatus}
        onChange={onChange}
        onSave={onUpdate}
      />
    );
  }

  return (
    <div className={styles.listTitleContainer}>
      {leftButtonSlot}
      {rightButtonSlot}
      <h3 className={styles.listTitle} onClick={toggleEditingStatus}>
        {text}
      </h3>
    </div>
  );
}

export default ListTitle;

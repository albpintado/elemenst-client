import React, { useEffect, useState } from "react";
import { TLineList } from "components/linelist/LineList.type";
import styles from "./ListTitle.module.css";
import SaveIcon from "components/saveicon/SaveIcon";
import CancelIcon from "components/cancelicon/CancelIcon";
import ListTitleEditing from "./listtitleediting/ListTitleEditing";
import TrashIcon from "components/trashicon/TrashIcon";
import ConfirmTrashIcon from "components/confirmtrashicon/ConfirmTrashIcon";
import EditIcon from "components/editicon/EditIcon";
import { deleteList, updateList, useLineLists } from "contexts/LineListContext";
import { LineItemsActionType, useLineItems } from "contexts/LineItemContext";
import { getLocalCurrentList, setLocalCurrentList } from "utils/LocalStorage";
import { useError } from "contexts/CreationErrorContext";
import { useDarkMode } from "contexts/DarkModeContext";

interface ListTitleProps {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
}

function ListTitle({ currentList, setCurrentList }: ListTitleProps) {
  const { lineListsState, lineListsDispatch } = useLineLists();
  const { lineItemsState, lineItemsDispatch } = useLineItems();
  const { darkMode } = useDarkMode();
  const { setError } = useError();
  const originalTitle = getLocalCurrentList()?.name || currentList?.name;
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
      const { data, status } = await updateList(
        lineListsDispatch,
        currentList,
        text
      );
      if (status == 422) {
        setText(currentList.name);
        setError(data as string);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
      setIsEditing(!isEditing);
    }
  };

  const onDelete = () => {
    if (currentList != undefined) {
      const lineItemsFromCurrentList = lineItemsState.lineItems;
      lineItemsFromCurrentList.forEach((item) => {
        lineItemsDispatch({
          type: LineItemsActionType.DELETE_ITEM,
          payload: item,
        });
      });
      setCurrentList(undefined);
      setLocalCurrentList(undefined);
    }
    deleteList(currentList, lineListsState, lineListsDispatch);
  };

  const rightButtonSlot = isEditing ? (
    <button
      className={darkMode ? styles.darkListTitleButton : styles.listTitleButton}
      onClick={onUpdate}
    >
      <SaveIcon />
    </button>
  ) : isDeleting ? (
    <button
      className={darkMode ? styles.darkListTitleButton : styles.listTitleButton}
      onClick={toggleDeletingStatus}
    >
      <CancelIcon />
    </button>
  ) : (
    <button
      className={darkMode ? styles.darkListTitleButton : styles.listTitleButton}
      onClick={toggleEditingStatus}
    >
      <EditIcon />
    </button>
  );

  const leftButtonSlot = isDeleting ? (
    <button
      className={`${
        darkMode ? styles.darkListTitleButton : styles.listTitleButton
      } ${styles.ConfirmTrashIcon}`}
      onClick={onDelete}
    >
      <ConfirmTrashIcon />
    </button>
  ) : isEditing ? (
    <button
      className={darkMode ? styles.darkListTitleButton : styles.listTitleButton}
      onClick={toggleEditingStatus}
    >
      <CancelIcon />
    </button>
  ) : (
    <button
      className={darkMode ? styles.darkListTitleButton : styles.listTitleButton}
      onClick={toggleDeletingStatus}
    >
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

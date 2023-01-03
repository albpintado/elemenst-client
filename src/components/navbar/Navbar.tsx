import React, { useContext } from "react";
import { TLineList } from "components/linelist/LineList.type";
import styles from "./Navbar.module.css";
import { LineListsContext } from "contexts/LineListContext";
import { setLocalCurrentList } from "utils/LocalStorage";

interface NavbarProps {
  setCurrentList: (list: TLineList | undefined) => void;
}

function Navbar({ setCurrentList }: NavbarProps) {
  const { lineListsState: listsState } = useContext(LineListsContext);
  const onClickTitle = () => {
    setCurrentList(undefined);
    setLocalCurrentList(undefined);
  };

  const onClickList = (listName: string) => {
    const fetchItems = async () => {
      const list = listsState.lineLists.find((list) => {
        return list.name == listName;
      });
      if (list != undefined) {
        setCurrentList(list);
        setLocalCurrentList(list);
      }
    };
    fetchItems();
  };

  return (
    <header>
      <h1 className={styles.header_title} onClick={onClickTitle}>
        Elemenst
      </h1>
      <nav>
        <ul className={styles.navbar_lists}>
          {listsState.lineLists.map((list) => {
            return (
              <li
                className={styles.navbar_lists_list}
                key={"List n." + list.id}
                onClick={() => onClickList(list.name)}
              >
                {list.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

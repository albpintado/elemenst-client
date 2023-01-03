import React, { useContext } from "react";
import { TLineList } from "components/linelist/LineList.type";
import styles from "./Navbar.module.css";
import { LineListsContext } from "contexts/LineListContext";
import { setLocalCurrentList } from "utils/LocalStorage";
import { useDarkMode } from "contexts/DarkModeContext";
import DarkIcon from "components/darkicon/DarkIcon";

interface NavbarProps {
  setCurrentList: (list: TLineList | undefined) => void;
}

function Navbar({ setCurrentList }: NavbarProps) {
  const { lineListsState: listsState } = useContext(LineListsContext);
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
      <div className={styles.headerContainer}>
        <label>
          <input
            type="checkbox"
            defaultChecked={darkMode}
            onClick={toggleDarkMode}
          />
          <span
            className={darkMode ? styles.lightModeIcon : styles.darkModeIcon}
          />
          <strong>{""}</strong>
        </label>
        <h1 className={styles.headerTitle} onClick={onClickTitle}>
          Elemenst
        </h1>
      </div>
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

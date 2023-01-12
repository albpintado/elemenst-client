import React from "react";
import { TLineList } from "components/linelist/LineList.type";
import styles from "./Navbar.module.css";
import { clearLists, useLineLists } from "contexts/LineListContext";
import { setLocalCurrentList } from "utils/LocalStorage";
import { useDarkMode } from "contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { logOut } from "services/auth.service";
import LogoutButton from "components/logoutbutton/LogoutButton";
import { useAuth } from "contexts/AuthContext";
import { clearLineItems, useLineItems } from "contexts/LineItemContext";

interface NavbarProps {
  setCurrentList: (list: TLineList | undefined) => void;
}

function Navbar({ setCurrentList }: NavbarProps) {
  const { lineListsState, lineListsDispatch } = useLineLists();
  const { lineItemsDispatch } = useLineItems();
  const { darkMode, setDarkMode } = useDarkMode();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const onClickTitle = () => {
    setCurrentList(undefined);
    setLocalCurrentList(undefined);
  };

  const onClickList = (listName: string) => {
    const fetchItems = async () => {
      const list = lineListsState.lineLists.find((list) => {
        return list.name == listName;
      });
      if (list != undefined) {
        setCurrentList(list);
        setLocalCurrentList(list);
      }
    };
    fetchItems();
  };

  const onLogout = async () => {
    await logOut();
    setIsAuthenticated(false);
    clearLists(lineListsDispatch);
    clearLineItems(lineItemsDispatch);
    navigate("/login");
  };

  return (
    <header className={styles.headerContainer}>
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
      {isAuthenticated && <LogoutButton onLogout={onLogout} />}
      <nav
        className={
          darkMode && !isAuthenticated
            ? `${styles.navbar} ${styles.unauthenticated} ${styles.dark}`
            : !isAuthenticated
            ? `${styles.navbar} ${styles.unauthenticated}`
            : darkMode && isAuthenticated
            ? `${styles.navbar} ${styles.dark}`
            : styles.navbar
        }
      >
        <ul
          className={
            darkMode && !isAuthenticated
              ? `${styles.navbarList} ${styles.unauthenticated} ${styles.dark}`
              : !isAuthenticated
              ? `${styles.navbarList} ${styles.unauthenticated}`
              : darkMode && isAuthenticated
              ? `${styles.navbarList} ${styles.dark}`
              : styles.navbarList
          }
        >
          {lineListsState.lineLists.map((list) => {
            return (
              <li
                className={styles.navbarListItem}
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

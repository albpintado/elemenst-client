import React from "react";
import { TLineList } from "components/linelist/LineList.type";
import styles from "./Navbar.module.css";

interface NavbarProps {
  lineLists: TLineList[];
  onClickList: (listName: string) => void;
  onClickTitle: () => void;
}

function Navbar({ lineLists, onClickTitle, onClickList }: NavbarProps) {
  return (
    <header>
      <h1 className={styles.header_title} onClick={onClickTitle}>
        Elemenst
      </h1>
      <nav>
        <ul className={styles.navbar_lists}>
          {lineLists.map((list) => {
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

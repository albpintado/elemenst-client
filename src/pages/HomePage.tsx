import React, { useEffect, useState } from "react";
import { TLineList } from "components/linelist/LineList.type";
import { getAllLists, useLineLists } from "contexts/LineListContext";

import ListPage from "./ListPage";
import NoListsPage from "./NoListsPage";
import Navbar from "components/navbar";
import { useDarkMode } from "contexts/DarkModeContext";

interface HomePageProps {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
}

function HomePage({ currentList, setCurrentList }: HomePageProps) {
  const { darkMode } = useDarkMode();
  const { lineListsState, lineListsDispatch } = useLineLists();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getAllLists(lineListsDispatch, setIsFetching);
  }, []);

  return (
    <div className={darkMode ? "dark-wrapper" : "light-wrapper"}>
      <Navbar setCurrentList={setCurrentList} />
      <main>
        {isFetching || lineListsState.lineLists.length == 0 ? (
          <NoListsPage setCurrentList={setCurrentList} />
        ) : (
          <ListPage currentList={currentList} setCurrentList={setCurrentList} />
        )}
      </main>
    </div>
  );
}

export default HomePage;

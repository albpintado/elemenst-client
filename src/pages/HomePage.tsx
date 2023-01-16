import React, { useEffect } from "react";
import { TLineList } from "components/linelist/LineList.type";
import { getAllLists, useLineLists } from "contexts/LineListContext";

import ListPage from "./ListPage";
import NoListsPage from "./NoListsPage";
import Navbar from "components/navbar";
import { useDarkMode } from "contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { isUserLoggedOn } from "utils/Authentication";
import { useAuth } from "contexts/AuthContext";

interface HomePageProps {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
  isFetchingData: boolean;
  setIsFetchingData: React.Dispatch<React.SetStateAction<boolean>>;
}

function HomePage({
  currentList,
  setCurrentList,
  isFetchingData,
  setIsFetchingData,
}: HomePageProps) {
  const { darkMode } = useDarkMode();
  const { isAuthenticated } = useAuth();

  const { lineListsState, lineListsDispatch } = useLineLists();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedOn()) {
      getAllLists(lineListsDispatch, setIsFetchingData);
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const isLoading = isFetchingData || lineListsState.lineLists.length == 0;

  return (
    <div className={darkMode ? "dark-wrapper" : "light-wrapper"}>
      <Navbar setCurrentList={setCurrentList} />
      <main>
        {isLoading ? (
          <NoListsPage setCurrentList={setCurrentList} />
        ) : (
          <ListPage currentList={currentList} setCurrentList={setCurrentList} />
        )}
      </main>
    </div>
  );
}

export default HomePage;

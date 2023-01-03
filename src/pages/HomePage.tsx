import React, { useEffect, useState } from "react";
import { TLineList } from "components/linelist/LineList.type";
import { getAllLists, useLineLists } from "contexts/LineListContext";

import ListPage from "./ListPage";
import NoListsPage from "./NoListsPage";

interface HomePageProps {
  currentList: TLineList | undefined;
  setCurrentList: (list: TLineList | undefined) => void;
}

function HomePage({ currentList, setCurrentList }: HomePageProps) {
  const { lineListsDispatch } = useLineLists();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getAllLists(lineListsDispatch, setIsFetching);
  }, []);

  return (
    <main>
      {isFetching ? (
        <NoListsPage setCurrentList={setCurrentList} />
      ) : (
        <ListPage currentList={currentList} setCurrentList={setCurrentList} />
      )}
    </main>
  );
}

export default HomePage;

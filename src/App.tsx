import React, { useState } from "react";
import "./App.css";

import { TLineList } from "components/linelist/LineList.type";

import Navbar from "components/navbar";
import HomePage from "pages/HomePage";

import { LineListsProvider } from "components/linelist/LineListContext";
import { LineItemsProvider } from "components/lineitem/LineItemContext";

function App() {
  const [currentList, setCurrentList] = useState<TLineList | undefined>();

  return (
    <LineListsProvider>
      <LineItemsProvider>
        <div className="wrapper">
          <Navbar setCurrentList={setCurrentList} />
          <HomePage currentList={currentList} setCurrentList={setCurrentList} />
        </div>
      </LineItemsProvider>
    </LineListsProvider>
  );
}

export default App;

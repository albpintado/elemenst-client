import React, { useState } from "react";
import "./App.css";

import { TLineList } from "components/linelist/LineList.type";

import Navbar from "components/navbar";
import HomePage from "pages/HomePage";

import { LineListsProvider } from "contexts/LineListContext";
import { LineItemsProvider } from "contexts/LineItemContext";
import { getLocalCurrentList } from "utils/LocalStorage";
import { ErrorProvider } from "contexts/CreationErrorContext";

function App() {
  const [currentList, setCurrentList] = useState<TLineList | undefined>(
    getLocalCurrentList()
  );

  return (
    <LineListsProvider>
      <LineItemsProvider>
        <ErrorProvider>
          <div className="wrapper">
            <Navbar setCurrentList={setCurrentList} />
            <HomePage
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </div>
        </ErrorProvider>
      </LineItemsProvider>
    </LineListsProvider>
  );
}

export default App;

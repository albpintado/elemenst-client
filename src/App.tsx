import React, { useState } from "react";
import "./App.css";

import { TLineList } from "components/linelist/LineList.type";

import Navbar from "components/navbar";
import HomePage from "pages/HomePage";

import { LineListsProvider } from "contexts/LineListContext";
import { LineItemsProvider } from "contexts/LineItemContext";
import { getLocalCurrentList } from "utils/LocalStorage";
import { ErrorProvider } from "contexts/CreationErrorContext";
import { DarkModeProvider, useDarkMode } from "contexts/DarkModeContext";

function App() {
  const [currentList, setCurrentList] = useState<TLineList | undefined>(
    getLocalCurrentList()
  );

  return (
    <DarkModeProvider>
      <LineListsProvider>
        <LineItemsProvider>
          <ErrorProvider>
            <HomePage
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </ErrorProvider>
        </LineItemsProvider>
      </LineListsProvider>
    </DarkModeProvider>
  );
}

export default App;

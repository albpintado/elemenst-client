import React, { useState } from "react";
import "./App.css";

import { TLineList } from "components/linelist/LineList.type";

import HomePage from "pages/HomePage";

import { LineListsProvider } from "contexts/LineListContext";
import { LineItemsProvider } from "contexts/LineItemContext";
import { getLocalCurrentList } from "utils/LocalStorage";
import { ErrorProvider } from "contexts/CreationErrorContext";
import { DarkModeProvider } from "contexts/DarkModeContext";
import { Route, Routes } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import { AuthProvider } from "contexts/AuthContext";
import RegisterPage from "pages/RegisterPage";

function App() {
  const [currentList, setCurrentList] = useState<TLineList | undefined>(
    getLocalCurrentList()
  );
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isLogInPage, setIsLogInPage] = useState(true);

  return (
    <DarkModeProvider>
      <AuthProvider>
        <LineListsProvider>
          <LineItemsProvider>
            <ErrorProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      currentList={currentList}
                      setCurrentList={setCurrentList}
                      isFetchingData={isFetchingData}
                      setIsFetchingData={setIsFetchingData}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <LoginPage
                      setCurrentList={setCurrentList}
                      isLogInPage={isLogInPage}
                      setIsLogInPage={setIsLogInPage}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <RegisterPage
                      setCurrentList={setCurrentList}
                      isLogInPage={isLogInPage}
                      setIsLogInPage={setIsLogInPage}
                    />
                  }
                />
              </Routes>
            </ErrorProvider>
          </LineItemsProvider>
        </LineListsProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;

import React, { useEffect } from "react";
import AccessForm from "components/accessform/AccessForm";
import Navbar from "components/navbar";
import { useDarkMode } from "contexts/DarkModeContext";
import { TLineList } from "components/linelist/LineList.type";
import { useNavigate } from "react-router-dom";
import { isUserLoggedOn } from "utils/Authentication";

interface UserAccessPageProps {
  setCurrentList: (list: TLineList | undefined) => void;
  isLogInPage: boolean;
  setIsLogInPage: (isLogInPage: boolean) => void;
}

function UserAccessPage({
  setCurrentList,
  isLogInPage,
  setIsLogInPage,
}: UserAccessPageProps) {
  const { darkMode } = useDarkMode();

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedOn()) {
      navigate("/");
    }
  }, []);

  return (
    <div className={darkMode ? "dark-wrapper" : "light-wrapper"}>
      <Navbar setCurrentList={setCurrentList} />
      <main>
        <AccessForm isLogin={isLogInPage} setIsLogInPage={setIsLogInPage} />
      </main>
    </div>
  );
}

export default UserAccessPage;

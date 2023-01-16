import ErrorMessage from "components/errormessage/ErrorMessage";
import TextInput from "components/textinput";
import { EInputType } from "components/textinput/InputType";
import { useAuth } from "contexts/AuthContext";
import { useError } from "contexts/CreationErrorContext";
import useInput from "hooks/useInput";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn, register } from "services/auth.service";
import { isUserLoggedOn } from "utils/Authentication";
import styles from "./AccessForm.module.css";

interface AccessFormProps {
  isLogin: boolean;
  setIsLogInPage: (isLogInPage: boolean) => void;
}

function AccessForm({ isLogin, setIsLogInPage }: AccessFormProps) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setError } = useError();

  const { inputValue: usernameValue, setInputValue: setUsernameValue } =
    useInput();
  const { inputValue: passwordValue, setInputValue: setPasswordValue } =
    useInput();

  const navigate = useNavigate();

  const logInOrRegister = isLogin ? "Log In" : "Register";

  useEffect(() => {
    if (isUserLoggedOn()) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameValue.current && passwordValue.current) {
      const { status } = await logIn(
        usernameValue.current.value,
        passwordValue.current.value
      );

      if (status == 200) {
        setIsAuthenticated(true);
      } else {
        setError("Wrong credentials.");

        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameValue.current && passwordValue.current) {
      const { data, status } = await register(
        usernameValue.current.value,
        passwordValue.current.value
      );

      if (status == 422) {
        setError(data as string);

        setTimeout(() => {
          setError("");
        }, 2000);

        return;
      }

      usernameValue.current.value = "";
      passwordValue.current.value = "";
      setIsLogInPage(true);
      navigate("/login");
    }
  };

  return (
    <div className={styles.accessFormContainer}>
      <ErrorMessage />
      <div className={styles.card}>
        <div className={styles.card__content}>
          <h2 className={styles.accessHeader}>{logInOrRegister}</h2>
          <form onSubmit={isLogin ? onLogin : onRegister}>
            <TextInput
              type={EInputType.TEXT}
              placeholder="Username"
              inputValue={usernameValue}
              setInputValue={setUsernameValue}
            />
            <TextInput
              type={EInputType.PASSWORD}
              placeholder="Password"
              inputValue={passwordValue}
              setInputValue={setPasswordValue}
            />
            <button className={styles.accessButton} type="submit">
              <span>{isLogin ? "Log In" : "Register"}</span>
            </button>
          </form>
        </div>
      </div>
      {isLogin ? (
        <p className={styles.text}>Don't have an account?</p>
      ) : (
        <p className={styles.text}>Already have an account?</p>
      )}
      {isLogin ? (
        <Link to="/register" onClick={() => setIsLogInPage(false)}>
          Register
        </Link>
      ) : (
        <Link to="/login" onClick={() => setIsLogInPage(true)}>
          Log in
        </Link>
      )}
    </div>
  );
}

export default AccessForm;

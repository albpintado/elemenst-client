import TextInput from "components/textinput";
import { EInputType } from "components/textinput/InputType";
import { useAuth } from "contexts/AuthContext";
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
      await logIn(
        usernameValue.current.value,
        passwordValue.current.value
      ).then((response) => {
        if (response) {
          setIsAuthenticated(true);
        }
      });
    }
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (usernameValue.current && passwordValue.current) {
      const response = await register(
        usernameValue.current.value,
        passwordValue.current.value
      );

      if (response.status === 201) {
        usernameValue.current.value = "";
        passwordValue.current.value = "";
        setIsLogInPage(true);
        navigate("/login");
      }
    }
  };

  return (
    <div className={styles.accessFormContainer}>
      <section className={styles.accessFormWithHeader}>
        <h2>{logInOrRegister}</h2>
        <form
          className={styles.accessForm}
          onSubmit={isLogin ? onLogin : onRegister}
        >
          <TextInput
            placeholder="Username"
            type={EInputType.TEXT}
            setInputValue={setUsernameValue}
            inputValue={usernameValue}
          />
          <TextInput
            placeholder="Password"
            type={EInputType.PASSWORD}
            setInputValue={setPasswordValue}
            inputValue={passwordValue}
          />
          <button type="submit">{isLogin ? "Log In" : "Register"}</button>
        </form>
      </section>
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

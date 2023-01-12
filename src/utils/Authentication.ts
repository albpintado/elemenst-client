export const isUserLoggedOn = () => {
  const token = getToken();
  return token !== null || token == "";
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeTokenAndCurrentList = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentList");
};

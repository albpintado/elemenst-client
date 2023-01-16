import { LoginResponse, UserError, UserResponse } from "utils/ApiResponses";
import { removeTokenAndCurrentList, setToken } from "utils/Authentication";

const logIn = async (
  userName: string,
  password: string
): Promise<LoginResponse> => {
  const request = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName, password: password }),
  });

  const authorizationHeader = request.headers.get("Authorization");
  if (request.status === 200 && authorizationHeader !== null) {
    const token = authorizationHeader.split("Bearer ")[1];
    setToken(token);
  }
  return { data: authorizationHeader, status: request.status };
};

const register = async (
  userName: string,
  password: string
): Promise<UserResponse | UserError> => {
  const request = await fetch("http://localhost:8080/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName, password: password }),
  });

  console.log(request);
  const response = await request.json();

  return { data: response, status: request.status };
};

const logOut = async (): Promise<void> => {
  await fetch("http://localhost:8080/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  removeTokenAndCurrentList();
};

export { logIn, register, logOut };

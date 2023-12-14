import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authHelpers";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //when the webpage is reloaded, try to check if the user was logged in using the local storage and update the auth context
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
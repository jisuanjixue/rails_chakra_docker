import React, { useReducer, useMemo } from "react";
import { UserContext } from "../controllers/ContextManager";
import { useConst } from "@chakra-ui/react";

const reducer = (state, action) => {
  switch (action.type) {
    case "getUser":
      return { ...state, user: action.payload };
    case "updateUser":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const initialState = useConst({ user: {} });

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserProvider;

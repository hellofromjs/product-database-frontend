import { createContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import { INIT_USER, LOGOUT_USER } from "./types";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const setUserData = (user) => {
		localStorage.setItem("access_token", JSON.stringify(user.access_token));
		dispatch({ type: INIT_USER, payload: user });
	};

	const removeUserData = () => {
		localStorage.removeItem("access_token");
		dispatch({ type: LOGOUT_USER });
	};

	const value = {
		user: state.user,
		setUserData,
		removeUserData,
	};

	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
};

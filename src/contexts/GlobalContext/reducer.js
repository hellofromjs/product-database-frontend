import { INIT_USER, LOGOUT_USER } from "./types";

export const initialState = {
	user: {
		id: 0,
		name: '',
		email: '',
		access_token: null,
	}
};

const globalReducer = (state, action) => {
	switch (action.type) {
		case INIT_USER:
			return {
				...state,
				user: action.payload
			};
		case LOGOUT_USER:
			return {
				...state,
				user: initialState.user
			};
		default:
			throw Error("Cannot match case in 'globalReducer'");
	}
};

export default globalReducer;
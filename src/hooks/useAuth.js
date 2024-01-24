import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext/GlobalContext";

export default function useAuth() {
	const { user } = useContext(GlobalContext);

	const access_token = user.access_token ?? JSON.parse(localStorage.getItem('access_token'));

	return [access_token];
}


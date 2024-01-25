import useAuth from "../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function PrivateRoutes() {
	const location = useLocation()
	const [access_token] = useAuth()

	return access_token ? (
		<Outlet />
	) : (
		<Navigate to="/login" replace state={{ from: location }} />
	)
}

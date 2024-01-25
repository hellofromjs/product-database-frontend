import { Link, redirect, useNavigate } from "react-router-dom"
import { logout } from "../../services/user"
import useAuth from "../../hooks/useAuth"
import { useContext } from "react"
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext"
import Dropdown from "../Dropdown/Dropdown"

export default function Navbar() {
	const [token] = useAuth()
	const { removeUserData, user } = useContext(GlobalContext)
	const navigate = useNavigate()

	async function handleLogout() {
		const [response, error] = await logout(token)
		if (error === null) {
			removeUserData()
			return redirect("/")
		}
	}

	return (
		<nav className="bg-black text-white py-3 px-5">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-xl">
					Product Database
				</Link>
				{user.access_token ? (
					<Dropdown className="right-0" title={user.name}>
						<li
							className="hover:bg-gray-200 py-2 px-4"
							onClick={() => navigate("/home")}
						>
							Dashboard
						</li>
						<li className="hover:bg-gray-200 py-2 px-4" onClick={handleLogout}>
							Logout
						</li>
					</Dropdown>
				) : (
					<ul className="flex gap-2">
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				)}
			</div>
		</nav>
	)
}

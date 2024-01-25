import { useContext, useEffect, useState } from "react"
import { login } from "../../services/user"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext"
import ServerError from "../../components/ServerError/ServerError"

export default function Login() {
	const [formData, setFormData] = useState()
	const [searchParams, _setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const { user, setUserData } = useContext(GlobalContext)
	const [serverError, setServerError] = useState(null)

	async function handleSubmit(e) {
		e.preventDefault()
		const [response, error] = await login(formData.email, formData.password)
		setServerError(error)

		if (error === null) {
			setUserData({
				id: response.user.id,
				name: response.user.name,
				email: response.user.email,
				access_token: response.access_token,
			})
		}
	}

	useEffect(() => {
		if (user.access_token !== null) {
			const redirectPath = searchParams.get("redirectTo")

			if (redirectPath === null) {
				navigate("/home")
			} else {
				navigate(redirectPath)
			}
		}
	}, [user])

	function handleInput(e) {
		setFormData((oldValue) => ({
			...oldValue,
			[e.target.name]: e.target.value,
		}))
	}
	return (
		<div className="max-w-md w-full mx-auto p-6 bg-gray-600 rounded-lg shadow-md my-7">
			<h2 className="text-3xl text-center text-white font-bold mb-6">
				Welcome back
			</h2>
			<ServerError error={serverError} />
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						required
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleInput}
					/>
				</div>
				<div className="mb-4">
					<input
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleInput}
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-white"
					>
						Sign In
					</button>
				</div>
				<div className="text-white">
					Don&apos;t have an account?{" "}
					<Link to="/register" className="text-white font-semibold underline">
						Sign Up
					</Link>
				</div>
			</form>
		</div>
	)
}

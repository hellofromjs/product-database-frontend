import { useContext, useEffect, useState } from "react"
import { register } from "../../services/user"
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from "../../contexts/GlobalContext/GlobalContext"
import ServerError from "../../components/ServerError/ServerError"

export default function Register() {
	const [formData, setFormData] = useState()
	const navigate = useNavigate()
	const { user, setUserData } = useContext(GlobalContext)
	const [serverError, setServerError] = useState(null)

	async function handleSubmit(e) {
		e.preventDefault()
		const [response, error] = await register(
			formData.name,
			formData.email,
			formData.password,
			formData.password_confirmation
		)
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
			navigate("/home")
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
				Join Us
			</h2>
			<ServerError error={serverError} />
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						required
						type="text"
						placeholder="Name"
						name="name"
						onChange={handleInput}
					/>
				</div>
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
				<div className="mb-4">
					<input
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						type="password"
						placeholder="Repeat Password"
						name="password_confirmation"
						onChange={handleInput}
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-white"
					>
						Sign Up
					</button>
				</div>
				<div className="text-white">
					Have an account?{" "}
					<Link to="/login" className="text-white font-semibold underline">
						Sign In
					</Link>
				</div>
			</form>
		</div>
	)
}

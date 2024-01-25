import { API_URL, formatResponse } from "../utilities/helpers"

async function register(name, email, password, password_confirmation) {
	try {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
				password_confirmation,
			})
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

async function login(email, password) {
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			})
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

async function logout(access_token) {
	try {
		const response = await fetch(`${API_URL}/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": 'Bearer ' + access_token
			},
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

async function profile(access_token) {
	try {
		const response = await fetch(`${API_URL}/auth/me`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": 'Bearer ' + access_token
			},
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

export {
	login,
	register,
	logout,
	profile,
}
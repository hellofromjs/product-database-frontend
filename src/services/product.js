import { API_URL, formatResponse } from "../utilities/helpers"

async function getUserProducts(access_token, page = 1) {
	try {
		const response = await fetch(`${API_URL}/products?page=${page}`, {
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

async function createProduct(access_token, title, price, description, image) {
	const formData = new FormData()
	formData.set("title", title)
	formData.set("price", parseFloat(price))
	formData.set("description", description)
	formData.set("image", image)

	try {
		const response = await fetch(`${API_URL}/products`, {
			method: "POST",
			headers: {
				"Authorization": 'Bearer ' + access_token
			},
			body: formData,
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

async function getProduct(access_token, id) {
	try {
		const response = await fetch(`${API_URL}/products/${id}`, {
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

async function updateProduct(access_token, id, title, price, description, image) {
	const formData = new URLSearchParams()
	formData.append("title", title)
	formData.append("price", parseFloat(price))
	formData.append("description", description)

	// const formData = new FormData()
	// formData.set("title", title)
	// formData.set("price", parseFloat(price))
	// formData.set("description", description)
	// formData.set("image", image)

	try {
		const response = await fetch(`${API_URL}/products/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				"Authorization": 'Bearer ' + access_token
			},
			body: formData,
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

async function deleteProduct(access_token, id) {
	try {
		const response = await fetch(`${API_URL}/products/${id}`, {
			method: "DELETE",
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

async function getAllProducts(page = 1) {
	try {
		const response = await fetch(`${API_URL}/products/view/all?page=${page}`)

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

async function getSearchedProducts(access_token, perPage, name) {
	try {
		const response = await fetch(`${API_URL}/products/view/search?perPage=${perPage}&search=${name}`, {
			headers: {
				"Authorization": 'Bearer ' + access_token
			},
		})

		return await formatResponse(response)
	} catch (error) {
		console.error(error)
	}
}

export {
	getAllProducts,
	getUserProducts,
	createProduct,
	updateProduct,
	getProduct,
	deleteProduct,
	getSearchedProducts,
}
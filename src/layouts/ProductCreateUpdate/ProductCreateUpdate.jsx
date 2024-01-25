import { useContext, useEffect, useState } from "react"
import { createProduct, getProduct, updateProduct } from "../../services/product"
import useAuth from "../../hooks/useAuth"
import { redirect, useNavigate, useParams } from "react-router-dom"
import ServerError from "../../components/ServerError/ServerError"
import Toast from "../../components/Toast/Toast"
import { ToastContext } from "../../contexts/ToastContext/ToastContext"

export default function ProductCreateUpdate() {
	const [token] = useAuth()
	const { id } = useParams()
	const [formData, setFormData] = useState()
	const [serverError, setServerError] = useState(null)
	const navigate = useNavigate()
	const toast = useContext(ToastContext)

	useEffect(() => {
		async function init() {
			if (id) {
				const [response, error] = await getProduct(token, id)
				setFormData(response)
			}
		}
		init()
	}, [id])

	async function handleSubmit(e) {
		e.preventDefault()

		if (id) {
			const [data, error] = await updateProduct(
				token,
				id,
				formData.title,
				formData.price,
				formData.description,
				formData.image
			)
			setServerError(error)

			if (error === null) {
				toast.open(<Toast text="Product updated" variant="success" />)
				navigate("/home")
			}
		} else {
			const [data, error] = await createProduct(
				token,
				formData.title,
				formData.price,
				formData.description,
				formData.image
			)
			setServerError(error)

			if (error === null) {
				toast.open(<Toast text="Product created" variant="success" />)
				navigate("/home")
			}
		}
	}

	function handleInput(e) {
		setFormData((oldValue) => ({
			...oldValue,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<div className="max-w-md w-full mx-auto p-6 bg-gray-600 rounded-lg shadow-md my-7">
			<h2 className="text-3xl text-center text-white font-bold mb-6">
				{id ? "Update Product" : "Add Product"}
			</h2>
			<ServerError error={serverError} />
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						required
						type="text"
						placeholder="Title"
						name="title"
						onChange={handleInput}
						value={formData?.title || ""}
					/>
				</div>
				<div className="mb-4">
					<input
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						required
						type="numbers"
						placeholder="Price"
						name="price"
						onChange={handleInput}
						value={formData?.price || ""}
					/>
				</div>
				<div className="mb-4">
					<textarea
						className="w-full text-white px-3 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:border-sky-500"
						required
						rows={6}
						type="text"
						placeholder="Description"
						name="description"
						onChange={handleInput}
						value={formData?.description || ""}
					/>
				</div>
				<div className="mb-4">
					{formData?.image_url && (
						<img src={formData.image_url} className="w-full mb-4" />
					)}
					<input
						type="file"
						className="text-sm bg-gray-800 w-full rounded-e text-white
							file:mr-5 file:py-1 file:px-3 file:text-white
							file:font-medium file:border-none
							file:bg-gray-400
							hover:file:cursor-pointer hover:file:bg-blue-50
							hover:file:text-blue-700"
						name="image"
						onChange={(e) =>
							setFormData((oldValue) => ({
								...oldValue,
								image: e.target.files[0],
							}))
						}
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-white"
					>
						{id ? "Update" : "Add"}
					</button>
				</div>
			</form>
		</div>
	)
}

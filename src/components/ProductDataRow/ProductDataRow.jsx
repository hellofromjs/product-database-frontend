import { Link } from "react-router-dom"
import { deleteProduct } from "../../services/product"
import useAuth from "../../hooks/useAuth"

export default function ProductDataRow({ data, onRefreshList }) {
	const [token] = useAuth()

	async function handleDelete() {
		if (window.confirm(`Are you sure you want to delete "${data.title}"?`)) {
			const [response, error] = await deleteProduct(token, data.id)
			onRefreshList()
		}
	}

	return (
		<tr className="odd:bg-white even:bg-gray-100 border-b">
			<td className="px-6 py-4 text-gray-900">{data.title}</td>
			<td className="px-6 py-4 text-gray-900">{data.price}</td>
			<td className="px-6 py-4 text-gray-900">{data.description}</td>
			<td>
				<div className="flex flex-col gap-1 p-1">
					<Link
						to={`/products/update/${data.id}`}
						className="bg-blue-500 px-2 py-1 rounded-md text-white text-center"
					>
						Update
					</Link>
					<Link
						onClick={handleDelete}
						className="bg-red-600 px-2 py-1 rounded-md text-white text-center"
					>
						Delete
					</Link>
				</div>
			</td>
		</tr>
	)
}

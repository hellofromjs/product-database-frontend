import { Link } from "react-router-dom"
import { deleteProduct } from "../../services/product"
import useAuth from "../../hooks/useAuth"
import { useContext, useState } from "react"
import DeleteModal from "../Modals/DeleteModal"
import { ToastContext } from "../../contexts/ToastContext/ToastContext"
import Toast from "../Toast/Toast"

export default function ProductDataRow({ data, onRefreshList }) {
	const [token] = useAuth()
	const [openModal, setOpenModal] = useState(false)
	const toast = useContext(ToastContext)

	async function handleDelete() {
		const [response, error] = await deleteProduct(token, data.id)
		onRefreshList()
		toast.open(<Toast text="Product deleted" variant="success" />)
	}

	return (
		<>
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
							onClick={() => setOpenModal(true)}
							className="bg-red-600 px-2 py-1 rounded-md text-white text-center"
						>
							Delete
						</Link>
					</div>

					<DeleteModal
						onDelete={handleDelete}
						name={data.title}
						open={openModal}
						setOpen={setOpenModal}
					/>
				</td>
			</tr>
		</>
	)
}

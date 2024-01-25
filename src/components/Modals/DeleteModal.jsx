import { FaTrashAlt } from "react-icons/fa"
import Modal from "./Modal"

export default function DeleteModal({ onDelete, name, open, setOpen }) {
	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<div className="text-center w-56">
				<FaTrashAlt size={56} className="mx-auto text-red-500" />
				<div className="mx-auto my-4 w-48">
					<h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
					<p className="text-sm text-gray-500">
						Are you sure you want to delete &quot;{name}&quot;?
					</p>
				</div>
				<div className="flex gap-4">
					<button onClick={onDelete} className="btn btn-danger w-full">
						Delete
					</button>
					<button
						className="btn btn-light w-full"
						onClick={() => setOpen(false)}
					>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	)
}

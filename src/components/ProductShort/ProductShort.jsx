import placeholderImg from "../../assets/images/300x200.png"
import { Link } from "react-router-dom"
import { truncate } from "../../utilities/helpers"

export default function ProductShort({ data }) {
	return (
		<article className="flex flex-col border rounded-md border-gray-300 w-full bg-white">
			<img
				className="h-[200px] object-cover bg-gray-300 block"
				src={data.image_url || placeholderImg}
			/>
			<div className="p-3 flex-1 flex flex-col justify-between">
				<div>
					<h2 className="text-xl font-bold">{data.title}</h2>
					<div>{truncate(data.description, 100)}</div>
				</div>
				<Link
					to={`/products/read/${data.id}`}
					className="bg-blue-300 block p-1 text-center rounded-md font-medium mt-3"
				>
					Read More...
				</Link>
			</div>
		</article>
	)
}

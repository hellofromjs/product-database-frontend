import placeholderImg from "../../assets/images/300x200.png"
import { Link } from "react-router-dom"

export default function ProductShort({ data }) {
	let txt =
		data.description ||
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quibusdam ipsa? Recusandae rem molestiae itaque expedita alias. Exercitationem nulla necessitatibus ratione expedita, et accusantium! Modi maxime illum ducimus atque numquam quo perferendis temporibus inventore exercitationem non, labore ut, mollitia corporis doloremque molestiae deserunt! Reprehenderit recusandae neque non itaque cumque quae?"
	if (txt.length > 100) {
		txt = txt.slice(0, 100)
		txt += "..."
	}

	return (
		<div className="flex flex-col border rounded-md border-gray-300 w-full bg-white">
			<img
				className="h-[200px] object-cover bg-gray-300 block"
				src={data.image_url || placeholderImg}
			/>
			<div className="p-3 flex-1 flex flex-col justify-between">
				<div>
					<h2 className="text-xl font-bold">{data.title}</h2>
					<div>{txt}</div>
				</div>
				<Link
					to={`/products/read/${data.id}`}
					className="bg-blue-300 block p-1 text-center rounded-md font-medium mt-3"
				>
					Read More...
				</Link>
			</div>
		</div>
	)
}

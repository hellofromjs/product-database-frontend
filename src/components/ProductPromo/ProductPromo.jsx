import { Link } from "react-router-dom"
import placeholderImg from "../../assets/images/300x200.png"
import { truncate } from "../../utilities/helpers"

export default function ProductPromo({ product }) {
	return (
		<main className="container mx-auto px-5 flex flex-col lg:grid grid-cols-2 gap-3 p-4 bg-[#cfd9e6] rounded-md mt-3">
			<div>
				<img
					src={product.image_url || placeholderImg}
					className="w-full aspect-video object-cover"
				/>
			</div>
			<div className="flex flex-col justify-between">
				<div>
					<h2 className="text-5xl mb-5">
						{product.title}{" "}
						<small className="text-gray-500">
							(${parseFloat(product.price).toFixed(2)})
						</small>
					</h2>
					<p className="text-xl">{truncate(product.description, 400)}</p>
				</div>

				<Link
					to={`/products/read/${product.id}`}
					className="bg-blue-300 block p-1 text-center rounded-md font-medium text-3xl mt-3"
				>
					Read More...
				</Link>
			</div>
		</main>
	)
}

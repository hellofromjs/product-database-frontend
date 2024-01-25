import { redirect, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { getProduct } from "../../services/product"
import placeholderImg from "../../assets/images/300x200.png"

export default function ProductInfo() {
	const [token] = useAuth()
	const { id } = useParams()
	const [product, setProduct] = useState()

	useEffect(() => {
		async function init() {
			if (id) {
				const [response, error] = await getProduct(token, id)
				setProduct(response)
			}
		}
		init()
	}, [id])

	return (
		<>
			{product && (
				<div className="container mx-auto px-5 flex flex-col lg:grid grid-cols-2 gap-3 p-4">
					<div>
						<img src={product.image_url || placeholderImg} className="w-full" />
					</div>
					<div>
						<h2 className="text-5xl mb-5">
							{product.title} (${product.price})
						</h2>
						<p className="text-xl">{product.description}</p>
					</div>
				</div>
			)}
		</>
	)
}

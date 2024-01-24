import { redirect, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { getProduct } from "../../api/product"

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
				<div className="container px-5 flex flex-col lg:grid grid-cols-2 gap-3 p-4">
					<div>
						<img src={product.image_url} className="w-full" />
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

export async function loader(access_token) {
	if (access_token === null) {
		return redirect(
			"/login?redirectTo=" + window.location.pathname.replace("/", "%2F")
		)
	}

	return null
}

import { useEffect, useState } from "react"
import { getSearchedProducts } from "../../services/product"
import { useSearchParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import ProductsList from "../../components/ProductsList/ProductsList"

export default function ProductSearch() {
	const [products, setProducts] = useState()
	const [searchParams, setSearchParams] = useSearchParams()
	const [searchName, setSearchName] = useState(searchParams.get("name"))
	const [token] = useAuth()

	useEffect(() => {
		async function init() {
			if (searchName != null) {
				const [products, error] = await getSearchedProducts(
					token,
					20,
					searchName
				)
				setProducts(products)
			}
		}

		init()
	}, [searchName])

	return (
		<div>
			<form className="container mx-auto w-full">
				<input
					type="text"
					className="p-4 rounded-md placeholder:text-2xl mt-3 mx-auto block w-[calc(100%-40px)]"
					placeholder="Search for a product..."
					onChange={(e) => {
						setSearchName(e.target.value)
						setSearchParams({ name: e.target.value })
					}}
					value={searchParams.get("name") || ""}
				/>
			</form>

			<ProductsList products={products} />
		</div>
	)
}

import { Link } from "react-router-dom"
import { getUserProducts } from "../../services/product"
import ProductDataRow from "../../components/ProductDataRow/ProductDataRow"
import Pagination from "../../components/Pagination/Pagination"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import usePagination from "../../hooks/usePagination"

export default function Home() {
	const [token] = useAuth()
	const [products, setProducts] = useState()
	const [page, setPage] = usePagination()

	async function getProductsPage() {
		const [products, error] = await getUserProducts(token, page)
		setProducts(products)
	}

	useEffect(() => {
		async function init() {
			await getProductsPage()
		}
		init()
	}, [page])

	return (
		<div className="container mx-auto px-5">
			<div className="my-3">
				<Link
					to="/products/add"
					className="block max-w-40 bg-green-500 px-2 py-1 rounded-md text-white text-center"
				>
					Add Product
				</Link>
			</div>

			{products?.data.length > 0 && (
				<>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500">
							<thead className="text-xs text-gray-700 uppercase bg-gray-200">
								<tr>
									<th scope="col" className="px-6 py-3">
										Title
									</th>
									<th scope="col" className="px-6 py-3">
										Price
									</th>
									<th scope="col" className="px-6 py-3">
										Description
									</th>
									<th scope="col" className="px-6 py-3">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{products.data.map((product) => (
									<ProductDataRow
										key={product.id}
										data={product}
										onRefreshList={getProductsPage}
									/>
								))}
							</tbody>
						</table>
					</div>

					{products && (
						<Pagination
							prev_page_url={products.prev_page_url}
							next_page_url={products.next_page_url}
							current_page_num={products.current_page}
							last_page_num={products.last_page}
							onChangePage={setPage}
						/>
					)}
				</>
			)}
		</div>
	)
}

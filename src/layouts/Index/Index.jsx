import { useEffect, useState } from "react"
import { getAllProducts } from "../../services/product"
import usePagination from "../../hooks/usePagination"
import ProductShort from "../../components/ProductShort/ProductShort"
import Pagination from "../../components/Pagination/Pagination"

export default function Index() {
	const [products, setProducts] = useState()
	const [page, setPage] = usePagination()

	useEffect(() => {
		async function init() {
			const [products, error] = await getAllProducts(page)
			setProducts(products)
		}
		init()
	}, [page])

	return (
		<div>
			<div className="container px-3 mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,350px))] gap-4 my-5 justify-items-center justify-center">
				{products &&
					products.data.map((product) => (
						<ProductShort key={product.id} data={product} />
					))}
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
		</div>
	)
}

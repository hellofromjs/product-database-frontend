import { useEffect, useState } from "react"
import { getAllProducts } from "../../services/product"
import usePagination from "../../hooks/usePagination"
import ProductShort from "../../components/ProductShort/ProductShort"
import Pagination from "../../components/Pagination/Pagination"
import ProductPromo from "../../components/ProductPromo/ProductPromo"

export default function Index() {
	const [products, setProducts] = useState()
	const [page, setPage] = usePagination()
	const [promoProduct, setPromoProduct] = useState()

	useEffect(() => {
		async function init() {
			const [products, error] = await getAllProducts(page)
			setProducts(products)

			if (page === null || page == 1) {
				setPromoProduct(products.data[0])
				setProducts((prevVal) => ({ ...prevVal, data: prevVal.data.slice(1) }))
			} else {
				setPromoProduct(null)
			}
		}
		init()
	}, [page])

	return (
		<div>
			{promoProduct && <ProductPromo product={promoProduct} />}

			{products && (
				<>
					<div className="container px-3 mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,350px))] gap-4 my-5 justify-items-center justify-center">
						{products.data.map((product) => (
							<ProductShort key={product.id} data={product} />
						))}
					</div>

					<Pagination
						prev_page_url={products.prev_page_url}
						next_page_url={products.next_page_url}
						current_page_num={products.current_page}
						last_page_num={products.last_page}
						onChangePage={setPage}
					/>
				</>
			)}
		</div>
	)
}

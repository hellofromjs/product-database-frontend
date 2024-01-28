import { useEffect, useState } from "react"
import { getAllProducts } from "../../services/product"
import usePagination from "../../hooks/usePagination"
import ProductPromo from "../../components/ProductPromo/ProductPromo"
import ProductsList from "../../components/ProductsList/ProductsList"
import Pagination from "../../components/Pagination/Pagination"

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

			<ProductsList products={products} />

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

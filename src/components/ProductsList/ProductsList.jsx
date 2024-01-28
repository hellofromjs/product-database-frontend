import ProductShort from "../ProductShort/ProductShort"

export default function ProductsList({ products }) {
	return (
		<div>
			{products && (
				<>
					<div className="container px-3 mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,360px))] gap-3 my-5 justify-items-center justify-center">
						{products.data.map((product) => (
							<ProductShort key={product.id} data={product} />
						))}
					</div>
				</>
			)}
		</div>
	)
}

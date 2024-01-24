export default function ServerError({ error }) {
	return (
		<>
			{error && (
				<div className="w-full text-red-600 px-3 py-2 border border-red-600 rounded-lg bg-red-200 mb-4">
					<p>{error.message}</p>
					{error.errors &&
						Object.values(error.errors).map((error, i) => (
							<p key={i}>{error.join(" ")}</p>
						))}
				</div>
			)}
		</>
	)
}

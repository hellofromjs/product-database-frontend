export async function formatResponse(response) {
	const data = await response.json();

	if (response.ok) {
		return [data.data, null];
	} else {
		return [null, { message: data.message, errors: data.errors }];
	}
}
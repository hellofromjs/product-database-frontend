export const API_URL = 'https://demo-api.ideabridge.lt/api'

export async function formatResponse(response) {
	const data = await response.json()

	if (response.ok) {
		return [data.data, null]
	} else {
		return [null, { message: data.message, errors: data.errors }]
	}
}

export function truncate(text, length) {
	let txt =
		text ||
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quibusdam ipsa? Recusandae rem molestiae itaque expedita alias. Exercitationem nulla necessitatibus ratione expedita, et accusantium! Modi maxime illum ducimus atque numquam quo perferendis temporibus inventore exercitationem non, labore ut, mollitia corporis doloremque molestiae deserunt! Reprehenderit recusandae neque non itaque cumque quae?"

	if (txt.length > length) {
		txt = txt.slice(0, length)
		txt += "..."
	}

	return txt
}
export class HttpRequest {
	static async getData(url, method = 'get', contentType = 'application/json') {
		const response = await fetch(url, {
			method,
			contentType
		})

		if (!response.ok)
			throw new Error(`Failed to get data on the URL: ${response.url}; status: ${response.status}`)

		return await response.json()
	}
}
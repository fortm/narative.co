const baseUrl = '/api'

export function buildUrl(url) {
  return baseUrl + url
}

export function buildHeaders(url, cookies) {
  const headers = {}

  headers.Accept = 'application/json'
  headers.credentials = 'same-origin'
  headers['Access-Control-Allow-Origin'] = true
  headers['Content-Type'] = 'application/json'

  return headers
}

export const checkHttpStatus = async response => {
  const contentType = response.headers.get('content-type')
  const isJSON = contentType.includes('application/json')

  if (isJSON) {
    try {
      const responseBody = await response.json()

      return {
        ...responseBody,
        statusCode: response.status,
      }
    } catch (err) {
      return fetchFailure(err)
    }
  } else if (response.ok) {
    const responseBody = await response.text()
    return responseBody
  }

  console.error('There was an error making your request')
}

export const fetchFailure = err => {
  console.error('There was an error making your request.\n', err)
}

export function apiCall({ method, endpoint, data }) {
  const config = {
    method: method.toUpperCase(),
    headers: buildHeaders(),
    body: JSON.stringify(data),
  }
  const url = buildUrl(endpoint)

  return fetch(url, config)
    .then(checkHttpStatus)
    .catch(fetchFailure)
}

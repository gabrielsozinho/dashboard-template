type RequestConfig = Omit<RequestInit, 'method' | 'body'>

const errorResponseHandlers: Record<Response['status'], (res: Response, errorData: { error: string }) => void> = {
  401: () => { window.location.replace('/dash') },

  500: (res, resData) => {
    const event500 = new CustomEvent('response500', { detail: {
      type: `500 - ${res.statusText}`,
      message: resData.error
    } })
    document.dispatchEvent(event500)
  }
}

class ApiClient {
  async get(path: string, config: RequestConfig = {}) {
    try {
      const response = await fetch('/api' + path, {
        method: 'GET',
        ...config
      })

      if (response.status === 204) {
        return null
      }

      const responseJson = await response.json()

      if (!response.ok) {
        if (response.status in errorResponseHandlers) errorResponseHandlers[response.status](response, responseJson)
        else throw new Error(response.statusText)
      }

      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  async post(path: string, bodyData: object, config: RequestConfig = {}) {
    try {
      const response = await fetch('/api' + path, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        ...config
      })
  
      if (response.status === 204) {
        return null
      }

      const responseJson = await response.json()

      if (!response.ok) {
        if (response.status in errorResponseHandlers) errorResponseHandlers[response.status](response, responseJson)
        else throw new Error(response.statusText)
      }

      return responseJson
    } catch (error) {
      console.error(error)
    }
  }

  async delete(path: string, bodyData: object, config: RequestConfig = {}) {
    try {
      const response = await fetch('/api' + path, {
        method: 'DELETE',
        body: JSON.stringify(bodyData),
        ...config
      })
  
      if (response.status === 204) {
        return null
      }

      const responseJson = await response.json()

      if (!response.ok) {
        if (response.status in errorResponseHandlers) errorResponseHandlers[response.status](response, responseJson)
        else throw new Error(response.statusText)
      }

      return responseJson
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ApiClient

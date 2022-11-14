import apiClient from './apiClient'

type LoginBodyData = {
  username: string
  password: string
  recaptchaToken: string
}

class LoginResource {
  async login(loginBody: LoginBodyData) {
    const data = await apiClient.post('/login', loginBody)
    if (!data) return false
    return data.success
  }
}

export default new LoginResource()

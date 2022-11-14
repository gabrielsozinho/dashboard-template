import apiClient from './apiClient'

class LogoutResource {
  async logout() {
    const data = await apiClient.post('/logout', {})
    if (!data) return false
    return data.success
  }
}

export default new LogoutResource()

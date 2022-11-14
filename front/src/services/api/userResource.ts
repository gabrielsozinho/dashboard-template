import { User } from '../../types'
import apiClient from './apiClient'

interface UserBody extends Omit<User, 'id'> {
  id: string | null
}

class UserResource {
  async get() {
    const data = await apiClient.get('/user')
    if (!data) return null
    return data.items
  }

  async post(userBody: UserBody) {
    const data = await apiClient.post('/user', userBody)
    if (!data) return false
    return data.success
  }
  
  async delete(userId: string) {
    const data = await apiClient.delete('/user', {
      id: userId
    })
    if (!data) return false
    return data.success
  }
}

export default new UserResource()

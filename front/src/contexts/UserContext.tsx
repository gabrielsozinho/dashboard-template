import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastData } from '../components/Toast';
import useToast from '../hooks/useToast';
import userResource from '../services/api/userResource';
import { User } from '../types';

type UserContextValue = {
  users: User[]
  fetchUsers: () => void
  showToast: (data: Omit<ToastData, 'createdAt'>) => void
}

export const UserContext = createContext({} as UserContextValue)

export const UserProvider = () => {
  const { Toast, showToast } = useToast()
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    const userData = await userResource.get()
    if (userData) setUsers(userData)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <UserContext.Provider value={{
      users,
      fetchUsers,
      showToast,
    }}>
      <Toast />
      <Outlet />
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)
export default useUser

import { ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import DashLayout from './components/DashLayout'
import { UserProvider } from './contexts/UserContext'
import theme from './theme'
import Error404 from './views/Error404'
import Home from './views/Home'
import Login from './views/Login'
import Records from './views/Records'
import Types from './views/Types'
import UserDetail from './views/UserDetail'
import Users from './views/Users'

const ToDash = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/' || '') navigate('/dash', { replace: true })
  }, [navigate])
  return null
}

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<ToDash />} />
          <Route path="dash">
            <Route index element={<Login />} />
            <Route element={<DashLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="users" element={<UserProvider />}>
                <Route index element={<Users />} />
                <Route path="new" element={<UserDetail />} />
                <Route path=":userId" element={<UserDetail />} />
              </Route>
              <Route path="types">
                <Route index element={<Types />} />
              </Route>
              <Route path="records">
                <Route index element={<Records />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

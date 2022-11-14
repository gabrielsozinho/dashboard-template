import { Box, Button, Paper, Typography } from '@mui/material'
import Head from 'next/head'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reaptcha from 'reaptcha'
import DashInput from '../components/DashInput'
import useToast from '../hooks/useToast'
import HomeIcon from '../icons/HomeIcon'
import loginResource from '../services/api/loginResource'

const REACAPTCHA_SITE_KEY = "6Lc2OG4hAAAAAF_Wx9HXq3O-FKTmyG_eOamPyykl"

const Login: FC = () => {
  const { Toast, showToast } = useToast()
  const navigate = useNavigate()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const isLoginDisabled = !username || !password || !recaptchaToken

  const updateRecaptchaToken = (token: string) => setRecaptchaToken(token)
  const clearRecaptchaToken = () => setRecaptchaToken('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginSuccess = await loginResource.login({
      username,
      password,
      recaptchaToken,
    })

    if (loginSuccess) navigate('/dash/home')
    else showToast({
      severity: 'error',
      message: 'Login fail'
    })
  }
  
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Paper
        component="main"
        sx={{
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '54px 30px',
        }}
      >
        <HomeIcon fontSize="large" />
        <Typography variant="h1" sx={{ fontSize: '24px', mt: '22px', mb: '4px' }}>
          Dashboard login
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'secondary.main', mt: '4px', mb: '35px' }}>
          Enter your username and password
        </Typography>

        <Box
          component="form"
          name="login-form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <DashInput
            id="user"
            label="User"
            value={username}
            type="text"
            size="small"
            onChange={(e) => setUsername(e.target.value)}
          />

          <DashInput
            id="password"
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box width={304} height={78}>
            <Reaptcha
              sitekey={REACAPTCHA_SITE_KEY}
              onVerify={updateRecaptchaToken}
              onExpire={clearRecaptchaToken}
            />
          </Box>
          <Button
            type="submit"
            disabled={isLoginDisabled}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Paper>
      <Toast />
    </Box>
  )
}

export default Login

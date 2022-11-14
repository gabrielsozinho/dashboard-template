import { default as BackArrow } from '@mui/icons-material/ArrowBackIos';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashInput from '../components/DashInput';
import useUser from '../contexts/UserContext';
import userResource from '../services/api/userResource';

const initialFormData = {
  username: '',
  email: '',
  password: '',
}

export default function UserDetail() {
  const navigate = useNavigate()
  const { userId: idParam } = useParams()
  const { users, fetchUsers, showToast } = useUser()
  const [formData, setFormData] = useState(initialFormData)

  const user = users.find((user) => user.id === idParam)

  useEffect(() => {
    if (!user) return
    setFormData({ ...user })
  }, [user])

  const handleBackLink: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    navigate('/dash/users')
  }  

  const handleSubmit: FormEventHandler<HTMLElement> = async (e) => {
    e.preventDefault()
    const success = await userResource.post({
      ...formData,
      id: user ? user.id : null
    })

    if (!success) {
      showToast({
        severity: 'error',
        message: 'Failed to update user'
      })
      return
    }
    
    showToast({
      severity: 'success',
      message: user ? 'User updated' : 'User created'
    })

    fetchUsers()
    navigate('/dash/users')
  }

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setFormData((old) => ({
      ...old,
      [name]: value
    }))
  }

  return (
    <main>
      <Button
        LinkComponent="a"
        href="/dash/users"
        sx={{ '.MuiButton-startIcon': { mr: 0 } }}
        onClick={handleBackLink}
      >
        <BackArrow sx={{ fontSize: '16px' }} />
        Back
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1, mb: 7.5 }}>
        <Typography
          component="span"
          color="primary"
          sx={{
            fontSize: '20px',
            fontWeight: 700,
            '&::after': {
              content: '"/"',
              display: 'inline-block',
              paddingInline: '0.5ch',
            }
          }}
        >
          Users
        </Typography>
        <Typography variant="h1" color="primary">
          {user ? `${user.username}` : 'New User' }
        </Typography>
      </Box>
      <Card
        component="form"
        onSubmit={handleSubmit}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            pt: 4.5,
            pr: 3.75,
            pb: 1.75,
            pl: 3.75,
          }}
        >
          <Typography variant="h2" color="primary">
            {user ? 'Edit user' : 'Create user'}
          </Typography>
          {user && (<DashInput
            id="id"
            label="id"
            name="id"
            size="small"
            value={user?.id}
            inputProps={{
              readOnly: true
            }}
          />)}
          <DashInput
            id="username"
            label="username"
            name="username"
            size="small"
            value={formData.username}
            onChange={handleFormChange}
          />
          <DashInput
            id="password"
            label="password"
            name="password"
            size="small"
            value={formData.password}
            onChange={handleFormChange}
          />
          <DashInput
            id="email"
            label="email"
            name="email"
            size="small"
            value={formData.email}
            onChange={handleFormChange}
          />
        </CardContent>
        <CardActions sx={{ p: 3.75 }}>
          <Box sx={{ ml: 'auto' }}>
            <Button
              component="a"
              href="/dash/users"
              variant="outlined"
              onClick={handleBackLink}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 3.75 }}
            >
              Submit
            </Button>
          </Box>
        </CardActions>
      </Card>
    </main>
  )
}

import styled from '@emotion/styled';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip, Typography } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashInput from '../components/DashInput';
import OrderIndicator from '../components/OrderIndicator';
import UserTableEntry from '../components/UserTableEntry';
import useUser from '../contexts/UserContext';

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
`

const tableHeaderCellStyle: SxProps = {
  padding: 0,
  paddingInline: 1.25,
  pb: 2.5,
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '20px',
  letterSpacing: '0.4px',
  color: 'primary.main',
}

type OrderState = {
  field: 'username' | 'email'
  direction: 'asc' | 'desc'
}

const orderReducer = (state: OrderState, newField: OrderState['field']) => ({
  field: newField,
  direction: state.direction === 'asc' ? 'desc' : 'asc' as OrderState['direction'],
})

const Users: FC = () => {
  const navigate = useNavigate()
  const { users, fetchUsers } = useUser()
  const [order, setOrder] = useReducer(orderReducer, { field: 'username', direction: 'asc' })
  const [searchForm, setSearchForm] = useState({
    username: '',
    email: '',
  })

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(searchForm)
  }  

  const handleSearchFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setSearchForm((old) => ({
      ...old,
      [name]: value
    }))
  }

  const deleteCallback = () => {
    fetchUsers()
  }  
  
  return (
    <main>
      <HeaderWrapper>
        <Typography variant="h1">
          Users
        </Typography>
        <Tooltip title="add user" arrow placement="left">
          <Button
            aria-label="add user"
            variant="contained"
            onClick={() => navigate('/dash/users/new')}
            sx={{ ml: 'auto', p: 1, minWidth: 'max-content' }}
          >
            <AddRoundedIcon />
          </Button>
        </Tooltip>
      </HeaderWrapper>
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{ paddingBlock: 3.375, paddingInline: 4, mt: 4.5, mb: 3.75 }}
      >
        <Typography variant="h2" sx={{ mb: 2.375 }}>
          Filter by
        </Typography>
        <Box sx={{ display: 'flex', gap: 3.75 }}>
          <DashInput
            size="small"
            label="username"
            name="username"
            placeholder="username"
            onChange={handleSearchFormChange}
          />
          <DashInput
            size="small"
            label="email"
            name="email"
            placeholder="email@email.com"
            onChange={handleSearchFormChange}
          />
          <Tooltip title="find user" arrow placement="left">
            <Button
              aria-label="find user"
              type="submit"
              variant="contained"
              sx={{ mt: 'auto', p: 1, minWidth: 'max-content' }}
            >
              <SearchIcon />
            </Button>
          </Tooltip>
        </Box>
      </Paper>
      <Paper sx={{ paddingBlock: 3.375, paddingInline: 4, minWidth: '100%' }}>
        <TableContainer>
          <Table sx={{ minWidth: '600px' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderCellStyle}>
                  <TableSortLabel
                    active={order.field === 'username'}
                    IconComponent={() => (
                      <OrderIndicator active={order.field === 'username'} order={order.direction} />
                    )}
                    onClick={() => setOrder('username')}
                  >
                    Username
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={tableHeaderCellStyle}>
                <TableSortLabel
                    active={order.field === 'email'}
                    IconComponent={() => (
                      <OrderIndicator active={order.field === 'email'} order={order.direction} />
                    )}
                    onClick={() => setOrder('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={tableHeaderCellStyle} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .map((user) => <UserTableEntry key={user.id} user={user} deleteCallback={deleteCallback} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 0.75,
            pl: 1.25,
            width: '100%',
          }}
        >
          <Box>
            <Typography sx={{
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.2px',
            }}>
              Total entrys: {users.length}
            </Typography>
          </Box>
          <Box>
            <IconButton size="small">
              <FirstPageIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <IconButton size="small">
              <NavigateBeforeIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <IconButton size="small" sx={{ fontSize: '14px', fontWeight: 600, minWidth: '34px', minHeight: '34px', color: 'primary.main' }}>
              1
            </IconButton>
            <IconButton size="small">
              <NavigateNextIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <IconButton size="small">
              <LastPageIcon sx={{ fontSize: '24px' }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </main>
  )
}

export default Users;

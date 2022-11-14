import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import Error500Modal from '../Error500Modal'
import Sidebar from '../Sidebar'

const DashLayoutWrapper = styled.div`
  display: flex;
`

const DashPageContainer = styled.div`
  width: 100%;
  padding: 20px;
`

const DashLayout = () => {
  return (
    <DashLayoutWrapper>
      <Error500Modal />
      <Sidebar />
      <DashPageContainer>
        <Outlet />
      </DashPageContainer>
    </DashLayoutWrapper>
  )
}

export default DashLayout

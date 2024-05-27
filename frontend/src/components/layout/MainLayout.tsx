import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { useAuth } from '../../context/auth/useAuth'

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`
interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Container>
      {isAuthenticated && <Sidebar />}
      <Content>{children}</Content>
    </Container>
  )
}

export default MainLayout

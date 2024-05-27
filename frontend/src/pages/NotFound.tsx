import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.colors.primary};
`

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </Container>
  )
}

export default NotFound

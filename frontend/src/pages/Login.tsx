import { useState } from 'react'
import InputLabel from '../components/common/InputLabel'
import Button from '../components/common/Button'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, error, setError } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      return setError('Preencha todos os campos')
    }

    setIsSubmitting(true)
    try {
      await login({ email, password })
      navigate('/app/')
    } catch (error) {
      setError('Erro ao fazer login. Por favor, tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <InputLabel
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
        />
        <InputLabel
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Aguarde...' : 'Acessar'}
        </Button>
        <ButtonCreate to="/create-account">Criar uma conta</ButtonCreate>
      </Form>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 74vh;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`
const ButtonCreate = styled(Link)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  text-align: center;
  border: none;
  padding: 16px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`

const ErrorMessage = styled.span`
  color: red;
  margin: 0;
  font-size: 12px;
`

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputLabel from '../components/common/InputLabel'
import Button from '../components/common/Button'
import styled from 'styled-components'
import { useUsers } from '../context/user/useUsers'

const CreateAccount: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addUser } = useUsers()
  const { name, email, password } = data

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      return setErrorMessage('Preencha todos os campos')
    }

    setIsSubmitting(true)
    setErrorMessage('') // Limpar mensagem de erro ao enviar
    try {
      await addUser(data)
      setData({ name: '', email: '', password: '' }) // Limpar campos após o envio bem-sucedido
    } catch (error) {
      setErrorMessage('Erro ao criar conta. Por favor, tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <h1>Criando sua conta</h1>
      <Form onSubmit={handleSubmit}>
        <InputLabel
          label="Name"
          value={name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          type="text"
          name="name"
        />
        <InputLabel
          label="Email"
          value={email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          name="email"
        />
        <InputLabel
          label="Password"
          value={password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type={showPassword ? 'text' : 'password'}
          name="password"
          onFocus={() => setShowPassword(true)}
          onBlur={() => setShowPassword(false)}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Aguarde...' : 'Criar'}
        </Button>
        <ButtonCreate to="/">Voltar para o login</ButtonCreate>
      </Form>
    </Container>
  )
}

export default CreateAccount

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

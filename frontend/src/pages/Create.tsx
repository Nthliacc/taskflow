import styled from 'styled-components'
import InputForm from '../components/InputForm'
import Title from '../components/common/Title'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const Create = () => {
  return (
    <Container>
        <Title>Criando nova tarefa</Title>
        <InputForm />
    </Container>
  )
}

export default Create
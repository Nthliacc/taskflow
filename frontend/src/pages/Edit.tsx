import Title from '../components/common/Title'
import InputForm from '../components/InputForm'
import styled from 'styled-components'

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* max-width: 80%; */
`
const Edit = () => {
  return (
    <EditContainer>
      <Title>Editando tarefa</Title>
      <InputForm />
    </EditContainer>
  )
}

export default Edit

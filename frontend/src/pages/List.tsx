import React from 'react'
import styled from 'styled-components'
import TaskList from '../components/TaskList'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'
import Title  from '../components/common/Title'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  /* max-width: 80%; */
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const List: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Lista de tarefas</Title>
        <Button title="Nova tarefa" as={Link} to="/app/create" >
          Nova tarefa
        </Button>
      </Header>
      {/*Implementar Filtro */}
      <TaskList />
    </Container>
  )
}

export default List

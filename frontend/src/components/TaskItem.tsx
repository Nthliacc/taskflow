import React, { useState } from 'react'
import styled from 'styled-components'
import { TaskResponse, PriorityType } from '../context/task/types'
import Icon from './common/Icon'
import { Link } from 'react-router-dom'

interface TaskItemProps {
  task: TaskResponse
  onComplete: (id: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  const [showDescription, setShowDescription] = useState(false)

  const toggleDescription = () => {
    setShowDescription(!showDescription)
  }

  return (
    <TaskItemContainer completed={task.completed} showDescription={showDescription}>
      <Checkbox
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
      />
      <TaskDetails>
        <TaskHeader completed={task.completed}>
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDate>{task.date ? new Date(task.date).toLocaleDateString() : ''}</TaskDate>
          <TaskTag priority={task.priority}>{task.priority}</TaskTag>
        </TaskHeader>
        <TaskDescription showDescription={showDescription}>
          {task.description}
        </TaskDescription>
        {task.description.length > 380 && (
          <ToggleDescriptionButton onClick={toggleDescription}>
            {showDescription ? 'Ver Menos' : 'Ver Mais'}
          </ToggleDescriptionButton>
        )}
      </TaskDetails>
      <TaskActions>
        <EditLink to={`/app/edit/${task.id}`}>
          <Icon name="edit" />
        </EditLink>
        <DeleteButton as={Link} to={`/app/delete/${task.id}`}>
          <Icon name="delete" />
        </DeleteButton>
      </TaskActions>
    </TaskItemContainer>
  )
}

const TaskItemContainer = styled.div<{ completed: boolean; showDescription: boolean }>`
  opacity: ${({ completed }) => (completed ? 0.5 : 1)};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px;
  gap: 8px;
  border-bottom: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`

const Checkbox = styled.input`
  cursor: pointer;
`

const TaskDetails = styled.div`
  flex: 1;
`

const TaskHeader = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`

const TaskTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
`

const TaskDate = styled.span`
  font-size: 12px;
  color: #666;
`

const TaskTag = styled.span<{ priority: PriorityType }>`
  font-size: 12px;
  color: white;
  background-color: ${({ theme, priority }) =>
    priority === 'Alta'
      ? theme.colors.danger
      : priority == 'Média'
      ? theme.colors.warning
      : theme.colors.success};
  padding: 2px 4px;
  border-radius: 2px;
`

const TaskDescription = styled.p<{ showDescription: boolean }>`
  font-size: 14px;
  color: #666;
  max-height: ${({ showDescription }) => (showDescription ? 'none' : '80px')};
  overflow: hidden;
`

const ToggleDescriptionButton = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`

const EditLink = styled(Link)`
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: white;
  border: none;
  border-radius: 2px;
  padding: 8px;
  cursor: pointer;
  opacity: 0.7;
  text-decoration: none;

  &:hover {
    opacity: 1;
  }
`

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  border-radius: 2px;
  padding: 8px;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`

export default TaskItem

import React, { useEffect } from 'react'
import styled from 'styled-components'
import TaskItem from './TaskItem'
import { useTasks } from '../context/task/useTasks'

const TaskList: React.FC = () => {
  const { tasks, fetchTasks, updateTask } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, []) // eslint-disable-line

  return (
    <TaskListContainer>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={updateTask}
          />
        ))
      ) : (
        <p>Nenhuma tarefa cadastrada</p>
      )}
    </TaskListContainer>
  )
}

const TaskListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: 76vh;
  padding: 8px;
  overflow: hidden;
  overflow-y: scroll;
`

export default TaskList

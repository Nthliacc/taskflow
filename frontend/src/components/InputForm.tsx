import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTasks } from '../context/task/useTasks'
import Button from './common/Button'
import Textarea from './common/Textarea'
import InputLabel from './common/InputLabel'
import Select from './common/Select'
import { PriorityType, Task } from '../context/task/types'
import { useNavigate, useParams } from 'react-router'
import { useUsers } from '../context/user/useUsers'

const InputForm: React.FC = () => {
  const { id } = useParams()
  const navegate = useNavigate()
  const { fetchTaskId, addTask, putTask } = useTasks()
  const { users, fetchUsers } = useUsers()

  const [data, setData] = useState<Task>({
    title: '',
    description: '',
    date: null,
    priority: 'Baixa',
    user: null,
  })

  useEffect(() => {
    fetchUsers()
    if (id) {
      fetchTaskId(id).then((task) => {
        console.log(task.priority)
        setData({
          title: task.title,
          description: task.description,
          date: task.date || null,
          priority: task.priority,
          user: task.user || null,
        })
      })
    }
  }, [id]) // eslint-disable-line

  const clearForm = () => {
    setData({
      title: '',
      description: '',
      date: null,
      priority: 'Baixa',
      user: null,
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.title || !data.description || !data.priority) {
      alert('Preencha todos os campos')
      return
    }
    try {
      id ? await putTask({
        title: data.title,
        description: data.description,
        date: data.date,
        priority: data.priority,
        user: data.user,
        completed: data.completed || false,
        id: id,
      }) : await addTask(data)

      clearForm()
      navegate('/app')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputLabel
        name="title"
        label="Titulo"
        type="text"
        value={data?.title || ''}
        onChange={(event) => setData({ ...data, title: event.target.value })}
        placeholder="Titulo da tarefa"
        required
      />
      <Textarea
        name="description"
        label="Descrição"
        placeholder="Descrição aqui ..."
        required
        value={data?.description || ''}
        onChange={(event) =>
          setData({ ...data, description: event.target.value })
        }
      />
      <InputLabel
        name="date"
        label="Data prevista"
        type="date"
        value={data?.date || ''}
        onChange={(event) => setData({ ...data, date: event.target.value })}
      />
      <Select
        name="priority"
        label="Prioridade"
        required
        options={[
          {
            value: 'baixa',
            label: 'Baixa',
          },
          {
            value: 'media',
            label: 'Média',
          },
          {
            value: 'alta',
            label: 'Alta',
          },
        ]}
        defaultValue={data?.priority || 'baixa'}
        value={data?.priority}
        onChange={(event) =>
          setData({
            ...data,
            priority: event.target.value as PriorityType,
          })
        }
      />
      {id && (
        <Select
          name="completeAd"
          label="Concluída"
          options={[
            {
              value: 'false',
              label: 'Não',
            },
            {
              value: 'true',
              label: 'Sim',
            },
          ]}
          defaultValue={data?.completed ? 'true' : 'false'}
          value={data?.completed ? 'true' : 'false'}
          onChange={(event) =>
            setData({
              ...data,
              completed: event.target.value === 'true' ? true : false,
            })
          }
        />
      )}
      <Select
        name="user"
        label="Usuário responsável"
        options={users.map((user) => ({
          value: String(user.id),
          label: user.name,
        }))}
        defaultValue={String(data?.user?.id) || ''}
        value={data?.user?.name}
        onChange={(event) =>
          setData({
            ...data,
            user: {
              id: Number(event.target.value),
              name: event.target.selectedOptions[0].text,
            },
          })
        }
      />

      <Button type="submit" title="adicionar">
        adicionar
      </Button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
`

export default InputForm

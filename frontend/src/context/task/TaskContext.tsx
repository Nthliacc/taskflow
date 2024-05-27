import React, { createContext, useState, ReactNode } from 'react';
import api from '../../services/api';
import { Task, TaskContextType, TaskResponse } from './types';

const baseURL = import.meta.env.VITE_BASE_URL + '/tasks'; // Declare the baseURL variable
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const handleAPIError = (error: Error) => {
    console.error('Erro ao chamar a API:', error);
  };

  const fetchTasks = () => {
    api.get(baseURL)
      .then(response => setTasks(response.data))
      .catch(handleAPIError);
  };

  const fetchTaskId = async (id: TaskResponse['id']) => {
    try {
      const res = await api.get(`${baseURL}/${id}`);
      return {
        ...res.data,
        date: res.data.date || null,
        user: res.data.user || null,
      };
    } catch (error) {
      handleAPIError(error as Error);
    }
  };

  const addTask = (data: Task) => {
    if (!data) return;

    api.post(baseURL, { data })
      .then(response => {
        setTasks([... response.data]);
      })
      .catch(handleAPIError);
  };

  const updateTask = (id: string) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask: TaskResponse = { ...taskToUpdate, completed: !taskToUpdate.completed };
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));

    api.put(`${baseURL}/${id}`, { ...updatedTask })
      .then(response => {
        setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      })
      .catch(handleAPIError);
  };

  const putTask = (data: TaskResponse) => {
    if (!data) return;

    setTasks(tasks.map(task => (task.id === data.id ? data : task)));

    api.put(`${baseURL}/${data.id}`, { ...data })
      .then(response => {
        setTasks(tasks.map(task => (task.id === data.id ? response.data : task)));
      })
      .catch(handleAPIError);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));

    api.delete(`${baseURL}/${id}`)
      .catch(handleAPIError);
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, fetchTaskId, addTask, updateTask, putTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

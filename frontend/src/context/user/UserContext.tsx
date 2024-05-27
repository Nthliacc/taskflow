import React, { createContext, useState, ReactNode } from 'react';
import { User, UserContextType } from './types';
import api from '../../services/api';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  const baseURL = import.meta.env.VITE_BASE_URL + '/users';

  const handleAPIError = (error: any) => {
    console.error('Erro ao chamar a API de usuários:', error);
    setError('Erro ao realizar operação');
  };

  const fetchUsers = () => {
    api.get(baseURL + '/')
      .then((response) => setUsers(response.data))
      .catch(handleAPIError);
  };

  const addUser = async (data: User) => {
    try {
      if (!data) throw new Error('Dados de usuário inválidos');

      const response = await api.post(baseURL + '/signup', { ...data });
      setUsers([...users, response.data]);
      setError('');
    } catch (error) {
      handleAPIError(error);
    }
  };

  const deleteUser = (id: string) => {
    api.delete(`${baseURL}/${id}`)
      .then(() => setUsers(users.filter((item) => item.id !== id)))
      .catch(handleAPIError);
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, fetchUsers, error }}>
      {children}
    </UserContext.Provider>
  );
};

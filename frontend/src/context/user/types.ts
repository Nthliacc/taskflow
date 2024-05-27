export interface User {
  id?: string
  name: string
  email: string
  password: string
}
export interface UserContextType {
  users: User[]
  error: string
  addUser: (data: User) => void
  deleteUser: (id: string) => void
  fetchUsers: () => void
}

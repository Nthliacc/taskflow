export interface TaskResponse {
  id: string
  title: string
  description: string
  date?: string | null
  priority: PriorityType
  user?: {
    id: number
    name: string
  } | null
  completed: boolean
}

export interface Task {
  id?: string
  title: string
  description: string
  date: string | null
  priority: PriorityType
  user: {
    id: number
    name: string
  } | null
  completed?: boolean
}

export interface TaskContextType {
  tasks: TaskResponse[]
  fetchTasks: () => void
  fetchTaskId: (id: TaskResponse['id']) => Promise<TaskResponse>
  addTask: (task: Task) => void
  updateTask: (id: string) => void
  putTask: (task: TaskResponse) => void
  deleteTask: (id: string) => void
}

export type PriorityType = "Baixa" | "Média" | "Alta"
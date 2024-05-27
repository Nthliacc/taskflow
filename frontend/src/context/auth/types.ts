export interface AuthContextType {
  isAuthenticated: boolean
  login: ({ email, password }: { email: string; password: string }) => void
  logout: () => void
  error: string | null
  setError: (error: string | null) => void
  verifyToken: () => void
}

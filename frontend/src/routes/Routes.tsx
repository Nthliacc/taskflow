import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import List from '../pages/List'
import NotFound from '../pages/NotFound'
import About from '../pages/About'
import Create from '../pages/Create'
import Edit from '../pages/Edit'
import Login from '../pages/Login'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from '../context/auth/AuthContext'
import Logout from '../pages/Logout'
import { useAuth } from '../context/auth/useAuth'
import CreateAccount from '../pages/CreateAccount'

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRedirect />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route
            path={`/app/`}
            element={<ProtectedRoute element={<List />} />}
          />
          <Route
            path="/app/about"
            element={<ProtectedRoute element={<About />} />}
          />
          <Route
            path="/app/create"
            element={<ProtectedRoute element={<Create />} />}
          />
          <Route
            path="/app/edit/:id"
            element={<ProtectedRoute element={<Edit />} />}
          />
          <Route
            path="/app/logout"
            element={<ProtectedRoute element={<Logout />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

const LoginRedirect: React.FC = () => {
  const { isAuthenticated, verifyToken } = useAuth()
  verifyToken()

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return <Login />
}

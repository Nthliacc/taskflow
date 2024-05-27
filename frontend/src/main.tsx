import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { TaskProvider } from './context/task/TaskContext'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import { AuthProvider } from './context/auth/AuthContext'
import { UserProvider } from './context/user/UserContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <TaskProvider>
            <GlobalStyle />
            <App />
          </TaskProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

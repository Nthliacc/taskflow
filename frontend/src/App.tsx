import React from 'react'
import MainLayout from './components/layout/MainLayout'
import AppRoutes from './routes/Routes'

const App: React.FC = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  )
}

export default App
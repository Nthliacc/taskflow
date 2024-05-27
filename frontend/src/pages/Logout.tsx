import Button from '../components/common/Button'

const Logout = () => {
  return (
    <div>
      <h1>Logout</h1>
      <p>Até logo!</p>
      <Button onClick={() => localStorage.removeItem('token')}>Sair</Button>
    </div>
  )
}

export default Logout

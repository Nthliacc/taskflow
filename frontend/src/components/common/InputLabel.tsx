import styled from 'styled-components'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  error?: string
}

const InputLabel = ({ name, label, error, required, ...rest }: InputProps) => {
  return (
    <Container>
      <Label htmlFor={name}>{label} {required && "*"}</Label>
      <StyledInput id={name} name={name} {...rest} />
      {error && <Error>{error}</Error>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Label = styled.label`
  font-size: 1.2rem;
`
const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.secondary};
  }
`
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`
export default InputLabel

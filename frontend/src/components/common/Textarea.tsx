import styled from 'styled-components'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  error?: string
}

const Textarea = ({ name, label, error, required, ...rest }: TextareaProps) => {
  return (
    <Container>
      <Label htmlFor={name}>{label} {required && "*"}</Label>
      <StyledTextarea id={name} name={name} {...rest} />
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
const StyledTextarea = styled.textarea`
  padding: 10px;
  min-height: 60px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  outline: none;
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
`
export default Textarea

import React from 'react'
import styled from 'styled-components'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: {
    value: string
    label: string
  }[]
}

const Select = ({ name, label, options, required, ...rest }: SelectProps) => {
  return (
    <Container>
      <Label htmlFor={name}>{label} {required && "*"}</Label>
      <StyledSelect id={name} name={name} defaultValue="" {...rest}>
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
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
const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  outline: none;
  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`
export default Select

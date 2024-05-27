import styled, { css } from 'styled-components';

interface ButtonProps {
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 2px;
  
  ${(props) => props.secondary && css`
    background-color: ${(props) => props.theme.colors.secondary};
    color: white;
  `}
  ${(props) => props.danger && css`
    background-color: ${(props) => props.theme.colors.danger};
    color: white;
  `}
  ${(props) => props.disabled && css`
    background-color: gray;
    color: white;
    cursor: not-allowed;
  `}
  
  &:hover {
    opacity: 0.8;
  }
`;

export default Button;

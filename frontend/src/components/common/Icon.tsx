// icon para ser usado como edit e delete
import React from 'react'
import styled from 'styled-components'
import edit from '../../assets/images/edit.svg'
import trash from '../../assets/images/delete.svg'

interface IconProps {
  name: string
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return (
    <IconContainer>
      {name === 'edit' && <Image src={edit} alt="edit" />}
      {name === 'delete' && <Image src={trash} alt="delete" />}
    </IconContainer>
  )
}

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Image = styled.img`
  width: 18px;
  height: 18px;
`

export default Icon

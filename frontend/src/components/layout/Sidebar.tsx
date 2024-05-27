import React from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  width: 10%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`

const SidebarItem = styled.a`
  color: white;
  text-decoration: none;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <h2>✔️</h2>
      <SidebarItem href="/app/">List</SidebarItem>
      <SidebarItem href="/app/about">About</SidebarItem>
      <SidebarItem href="/app/logout">Logout</SidebarItem>
    </SidebarContainer>
  )
}

export default Sidebar

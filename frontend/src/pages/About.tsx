import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
`;

const About: React.FC = () => {
  return (
    <Container>
      <Title>Sobre esse projeto</Title>
      <Paragraph>
        <b>Objetivo do Projeto:</b> Desenvolver uma aplicação web para gerenciar tarefas, permitindo ao usuário criar, editar e excluir tarefas, além de visualizar uma lista de tarefas existentes.
      </Paragraph>
      <Paragraph>
        <b>Tecnologias Utilizadas:</b>
        <ul>
          <li>Frontend: React e preferencialmente Styled-Components para construir a interface do usuário</li>
          <li>Backend: Node e ExpressJS</li>
          <li>Banco de Dados: PostgreSQL e alguma ORM para armazenar e gerenciar dados da aplicação</li>
        </ul>
      </Paragraph>
      <Paragraph>
        <b>Descrição do Projeto:</b>
        <ul>
          <li>A aplicação será uma lista de tarefas simples, com funcionalidades como Página Inicial, Página de Criação de Tarefas, Página de Edição de Tarefas, Página de Exclusão de Tarefas e uma API RESTful.</li>
          <li>Requisitos Técnicos: Detalhes sobre as tecnologias e requisitos técnicos para o desenvolvimento do projeto.</li>
          <li>Extras: Funcionalidades adicionais que podem ser implementadas, como autenticação de usuários, notificações por e-mail, etc.</li>
        </ul>
      </Paragraph>
      <Paragraph>
        <b>Critérios de Avaliação:</b>
        <ul>
          <li>Organização do Código: O código deve ser organizado, limpo e de fácil leitura.</li>
          <li>Funcionalidades: Todas as funcionalidades descritas devem estar implementadas.</li>
          <li>Interface do Usuário: A interface do usuário deve ser amigável e responsiva.</li>
          <li>Documentação: O projeto deve conter um README.md com instruções claras sobre como rodar a aplicação.</li>
        </ul>
      </Paragraph>
    </Container>
  );
};

export default About;

import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTasks } from '../context/task/useTasks';
import Button from '../components/common/Button';

const DeleteTaskPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navegate = useNavigate();
    const { fetchTaskId, deleteTask } = useTasks();
    const [taskTitle, setTaskTitle] = React.useState('');

    useEffect(() => {
        fetchTaskId(id as string)
            .then(task => {
                setTaskTitle(task.title);
            })
            .catch(error => {
                console.error(error);
                // Handle error fetching task details
            });
    }, [fetchTaskId, id]);

    const handleDelete = () => {
        deleteTask(id as string);
        navegate('/list');
    };

    return (
        <Container>
            <Title>Deletar Tarefa</Title>
            <p>Você tem certeza que deseja deletar a tarefa "{taskTitle}"?</p>
            <ButtonContainer>
                <Button onClick={handleDelete} danger>
                    Deletar
                </Button>
                <Link to="/tasks">
                    <Button secondary>Cancelar</Button>
                </Link>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default DeleteTaskPage;

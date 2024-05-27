import { Router } from 'express';
import { getTasks, addTask, updateTask, getTaskById, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, addTask);
router.put('/:id', authenticateToken, updateTask); // Usuário logado necessário para atualizar tarefa
router.delete('/:id', authenticateToken, deleteTask); // Usuário logado necessário para deletar tarefa
router.get('/:id', authenticateToken, getTaskById); // Usuário logado necessário para buscar tarefa

export default router;

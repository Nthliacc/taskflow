import { Router } from 'express';
import { createUser, listUsers } from '../controllers/userController';

const router = Router();

router.get('/', listUsers);  // Adiciona a rota GET para listar usuários
router.post('/signup', createUser); // Adiciona a rota POST para criar um usuário

export default router;
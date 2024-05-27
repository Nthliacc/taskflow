"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, taskController_1.getTasks);
router.post('/', authMiddleware_1.authenticateToken, taskController_1.addTask);
router.put('/:id', authMiddleware_1.authenticateToken, taskController_1.updateTask); // Usuário logado necessário para atualizar tarefa
router.delete('/:id', authMiddleware_1.authenticateToken, taskController_1.deleteTask); // Usuário logado necessário para deletar tarefa
router.get('/:id', authMiddleware_1.authenticateToken, taskController_1.getTaskById); // Usuário logado necessário para buscar tarefa
exports.default = router;

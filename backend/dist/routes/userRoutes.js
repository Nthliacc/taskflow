"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/', userController_1.listUsers); // Adiciona a rota GET para listar usuários
router.post('/signup', userController_1.createUser); // Adiciona a rota POST para criar um usuário
exports.default = router;

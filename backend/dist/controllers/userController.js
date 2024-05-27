"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('name:', name, 'email:', email, 'password:', password);
    try {
        // Verifica se todos os campos obrigatórios estão presentes
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        // Verifica se o email já está em uso
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail já está sendo usado' });
        }
        // Hash da senha
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Cria o usuário
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '1h', // O token expira em 1 hora
        });
        // Retorna uma resposta com o novo usuário
        res.status(201).json({ token });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createUser = createUser;
const listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true, // Seleciona apenas o campo 'id'
                name: true, // Seleciona apenas o campo 'name'
                isAdmin: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listUsers = listUsers;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("../middleware/authMiddleware");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
// Decodifica a chave secreta Base64
const JWT_SECRET_BASE64 = process.env.JWT_SECRET_BASE64;
const JWT_SECRET = Buffer.from(JWT_SECRET_BASE64, "base64").toString("utf8");
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar usuário pelo e-mail
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        // Verificar se a senha está correta
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
        // Gerar token JWT
        const token = (0, authMiddleware_1.generateToken)(user.id, user.email);
        // Retornar o token no corpo da resposta
        res.json({ token });
    }
    catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};
exports.loginUser = loginUser;
const checkToken = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ error: "Token não fornecido" });
    }
    try {
        if (token) {
            jsonwebtoken_1.default.verify(token, JWT_SECRET)
                ? res.json({ message: "Token válido" })
                : res.status(403).json({ message: "Token inválido" });
        }
        else {
            res.status(403).json({ message: "Token inválido" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};
exports.checkToken = checkToken;

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log('name:', name, 'email:', email, 'password:', password)
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    // Gera o token JWT
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h', // O token expira em 1 hora
    });
    // Retorna uma resposta com o novo usuário
    res.status(201).json({token});
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,    // Seleciona apenas o campo 'id'
        name: true,  // Seleciona apenas o campo 'name'
        isAdmin: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Decodifica a chave secreta Base64
const JWT_SECRET_BASE64 = process.env.JWT_SECRET_BASE64 as string;
const JWT_SECRET = Buffer.from(JWT_SECRET_BASE64, 'base64').toString('utf8');

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token not provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token', error: err });
    }

    req.user = user;
    next();
  });
};

export const generateToken = (userId: number, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

import { User } from '../models/User'; // Ajuste o caminho conforme necessário

declare module 'express-serve-static-core' {
  interface Request {
    user?: User; // Defina o tipo de `user` conforme a sua aplicação
  }
}

import { Router } from 'express';
import { checkToken, loginUser } from '../controllers/authController';


const router = Router();

router.post('/login', loginUser);
router.get('/verify', checkToken);


export default router;

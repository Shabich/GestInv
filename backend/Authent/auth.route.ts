import { Router } from 'express';
import { AuthController } from './auth.controller.js';

const router = Router();

router.post('/signup', AuthController.Signup);
router.post('/signin', AuthController.Signin);

export default router;

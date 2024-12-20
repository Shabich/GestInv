import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRoute = Router();

authRoute.post('/signup', AuthController.Signup);
authRoute.post('/signin', AuthController.Signin);

export default authRoute;

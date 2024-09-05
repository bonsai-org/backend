import express, { Request, Response } from 'express';
import { sanitizeSignUp, sanitizeLogin } from '../middleware/sanitizers';
import { signUp } from '../controllers/signup';
import { login } from '../controllers/login';
import { launchApplication } from '../controllers/launch-app'
import { validateLogin, validateSignup } from '../middleware/validators';
import { checkTokensMiddleware } from '../middleware/jwts';
const authRouter = express.Router();

authRouter.get('/', checkTokensMiddleware, launchApplication)

authRouter.post('/signup', validateSignup, sanitizeSignUp, signUp);

authRouter.post('/login', validateLogin, sanitizeLogin, login);

export default authRouter;
import express, { Request, Response } from 'express';
import { sanitizeSignUp } from '../middleware/sanitizers';
import { signUp } from '../controllers/signup';
import { validateSignup } from '../middleware/validators';
const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Root: based on logged-in state, redirect to appropriate path.',
    path: '/api/user/',
    verb: 'GET',
  });
});

userRouter.post('/signup', validateSignup, sanitizeSignUp, signUp);

userRouter.post('/login', (req: Request, res: Response) => {
  res.json({
    message: 'Login: Authenticates a user.',
    path: '/api/user/login',
    verb: 'POST',
  });
});

userRouter.get('/:id/profile', (req: Request, res: Response) => {
  res.json({
    message: `View Profile: Displays the profile for user ID ${req.params.id}.`,
    path: `/api/user/${req.params.id}/profile`,
    verb: 'GET',
  });
});

userRouter.delete('/:id/profile', (req: Request, res: Response) => {
  res.json({
    message: `Delete Profile: Deletes the profile for user ID ${req.params.id}.`,
    path: `/api/user/${req.params.id}/profile`,
    verb: 'DELETE',
  });
});

userRouter.put('/:id/profile', (req: Request, res: Response) => {
  res.json({
    message: `Update Profile: Updates the profile for user ID ${req.params.id}.`,
    path: `/api/user/${req.params.id}/profile`,
    verb: 'PUT',
  });
});

export default userRouter;

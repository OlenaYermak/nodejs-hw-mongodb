import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { loginUserSchema, registerUserSchema } from '../validation/users.js';

import {
  registerUserController,
  loginUserController,
  logoutController,
  refreshUsersSessionController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionController));
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;

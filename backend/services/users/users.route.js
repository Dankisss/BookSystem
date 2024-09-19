import express from 'express';
import { addBookToRead, createUser, deleteUser, getUser, removeBookToRead, updateUser, logIn, logOut } from './users.controller.js';
import { isAdmin } from '../../authentication/isAdmin.js';
import { authenticate } from '../../authentication/authenticate.js';
import cookieParser from 'cookie-parser';
import { cookie } from 'express-validator';

export const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(cookieParser());

userRouter.get('', logIn);
userRouter.get('/:id', getUser);

userRouter.post('', createUser);
userRouter.put('/', authenticate, updateUser);
userRouter.delete('/:id', authenticate, isAdmin, deleteUser);
userRouter.patch('/:id', authenticate, addBookToRead);
userRouter.patch('/:id/remove', authenticate, removeBookToRead);
userRouter.post('/logout', authenticate, logOut);

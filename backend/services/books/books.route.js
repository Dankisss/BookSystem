import express from 'express'
import { createBook, deleteBook, getBooks, updateBook } from './books.controller.js';
import { authenticate } from '../../authentication/authenticate.js';
import { isAdmin } from '../../authentication/isAdmin.js';
import cookieParser from 'cookie-parser';


export const bookRouter = express.Router();

bookRouter.use(express.json());
bookRouter.use(cookieParser());
bookRouter.use(authenticate);

bookRouter.get('/', getBooks);

bookRouter.post('/', isAdmin, createBook);

bookRouter.put('/:id', isAdmin, updateBook);

bookRouter.delete('/:id', isAdmin, deleteBook);

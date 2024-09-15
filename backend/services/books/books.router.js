import express from 'express'
import { createBook, deleteBook, getBooks, updateBook } from './books.controller.js';

export const bookRouter = express.Router();

bookRouter.use(express.json());

bookRouter.get('/', getBooks);

bookRouter.post('/', createBook);

bookRouter.put('/:id', updateBook);

bookRouter.delete('/:id', deleteBook);

import e from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { createBook, deleteBook, getBooks, updateBook } from './services/books/books.controller.js';

dotenv.config();


const app = e();
app.use(e.json());

connectDB();

app.post('/api/books', createBook);
app.get('/api/books', getBooks );
app.delete('/api/books/:id', deleteBook);
app.put('/api/books/:id', updateBook);

app.listen(5000, () => {
    console.log('Server started on port 5000');
})
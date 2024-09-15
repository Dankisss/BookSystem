import e from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { createBook } from './services/books/books.controller.js';

dotenv.config();


const app = e();
app.use(e.json());

connectDB();

app.post('/api/books', createBook);

app.listen(5000, () => {
    console.log('Server started on port 5000');
})
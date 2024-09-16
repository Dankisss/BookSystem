import express from "express"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { bookRouter } from "./services/books/books.router.js"

dotenv.config();

const app = express();

connectDB();

app.use('/api/books', bookRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
})
import express from "express"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { router } from "./services/books/books.router.js"

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/books', router);


app.listen(5000, () => {
    console.log('Server started on port 5000');
})
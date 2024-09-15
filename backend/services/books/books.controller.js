import Book from './books.model.js';
import mongoose from 'mongoose';

export const createBook = async (req, res) => {
    const book = req.body;

    if (!book.title || !book.author || !book.publicationYear || !book.genre) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const newBook = await Book.create(book);
        res.status(201).json({ sucess: true, message: newBook });
    } catch (error) {
        return errorHandler(error, res);
    }

};

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});

        res.status(200).json({ sucess: true, message: books });
    } catch (error) {
        return errorHandler(error, res);
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid book id!" });
    }

    try {
        await Book.findByIdAndDelete(id);

        res.status(202).json({ success: true, message: "Book deleted successfully!" });
    } catch (error) {
        return errorHandler(error, res);
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;

    const newData = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "No use found"});
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json({ success: true, message: updatedBook });

    } catch (error) {
        return errorHandler(error, res);
    }
}

const errorHandler = (error, res) => {
    console.error("Error: ", error);
    return res.status(500).json({ success: false, message: "Server Error" });
}
import Book from './books.model.js';
import mongoose from 'mongoose';

export const createBook = async (req, res) => {
    const book = req.body;

    if(!book.title || !book.author || !book.publicationYear || !book.genre) {
        return res.status(400).json({ message: 'Please provide all required fields' }); 
    }

    try {
        const newBook = await Book.create(book);
        res.status(201).json({sucess: true, message: newBook});
    } catch (error) {
        res.status(500).json({sucess: false, message: "Error creating book"});
    }

};

export const getBooks = async (req, res) => {
    
}
import User from './users.model.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }


    try {
        const newPassword = await bcrypt.hash(user.password, 12);

        const newUser = await User.create({ ...user, password: newPassword });

        sendEmail(user.username, user.email);
        res.status(201).json({ success: true, message: newUser });

    } catch (error) {

        if (error.code === 11000) {
            const field = Object.keys(error.errorResponse.keyPattern)[0];

            return res.status(409).json({ success: false, message: `Already exists: ${field}` });
        } else if (error.name == "ValidationError") {

            return res.status(400).json({ success: false, message: error.message });
        }

        console.error("Error: " + error);
        res.status(500).json({ success: false, message: 'Server Error' });

    }
}

export const logIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(401).json({ succes: false, message: 'User not found!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Password incorrect' });

        }
        const token = user.generateAccessJWT();

        res.cookie("SessionID", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 20 * 60 * 1000
        });
        
        res.status(200).json({ success: true, message: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
}

export const logOut = (req, res) => {
    res.cookie('SessionID', '', {maxAge: 1});

    return res.status(200).json( {success: true, message: "Logged out successfully"});
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    try {
        const user = await User.findById(id);
        res.status(200).json({ success: true, message: user })
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const updateUser = async (req, res) => {
    console.log(req.user);

    const id = req.user._id;
    const user = req.body;

    if (user.role) {
        return res.status(400).json({ success: false, message: 'Role cannot be updated' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

        res.status(200).json({ success: true, message: updatedUser });

    } catch (error) {
        
        if(error.code === 11000) {
            return res.status(401).json({ success: false, message: `${Object.keys(error.keyValue)[0]} already exists: ${Object.values(error.keyValue)[0]}`})
        }
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const addBookToRead = async (req, res) => {
    const { id } = req.params;
    const { bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ success: false, message: 'Invalid book id' });
    }

    try {
        const user = await User.findById(id);

        user.booksToRead.push(bookId);
        await user.save(user);

        res.status(200).json({ success: true, message: user });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export const removeBookToRead = async (req, res) => {
    const { id } = req.params;
    const { bookId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ success: false, message: 'Invalid book id' });
    }

    try {
        const user = await User.findById(id);

        user.booksToRead = user.booksToRead.filter(book => book._id.toString() !== bookId);

        await user.save(user);

        res.status(200).json({ success: true, message: user });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const sendEmail = (username, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jordan.radanov94@gmail.com',
            pass: 'pmkx tfzh yjfq gkzn'
        }
    })

    const mailOptions = {
        from: 'jordan.radanov94@gmai.com',
        to:email,
        subject: 'Register succesfully to book system',
        html: `<h1>Hello, ${username}!</h1> <p>You have registered to book system succesfully!<p>` 
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
        }else {
            console.log('Email sent succesfully:' , info.response);
        }
    })
}
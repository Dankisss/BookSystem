import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },

    booksToRead: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        default: []
    }
}, {timestamps: true})

userModel.methods.generateAccessJWT = function() {
    const payload = {
        _id: this._id,
        username: this.username,
        role: this.role
    }

    return jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '20m',
    });
}

const User = mongoose.model('User', userModel);
User
export default User;
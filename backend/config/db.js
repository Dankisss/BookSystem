import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to ' + process.env.MONGO_URL);
    } catch (error) {
        console.error('Error connecting to ' + process.env.MONGO_URL + ': ' + error);
    }
}
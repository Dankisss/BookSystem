import jwt from'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

export const authenticate = (req, res, next) => {
    try {

        const token = req.cookies.SessionID;
        
        if(!token) {
            console.log('Token not found');
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if(!decoded) {
            console.log('Token is invalid');
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }

        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error while authenticating: ', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
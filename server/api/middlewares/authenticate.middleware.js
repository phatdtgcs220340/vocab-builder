import jwt from 'jsonwebtoken'
import {apiLogger} from "../logger/logger.js";

const validateRegistration = (req, res, next) => {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    next();
};

const validateAuthentication = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    next();
};

const validateAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(apiLogger(req), `Verified token ${token}`)
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired access token' });
    }
}
export { validateRegistration, validateAuthentication, validateAccessToken }
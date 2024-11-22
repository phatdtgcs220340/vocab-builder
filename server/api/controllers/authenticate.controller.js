import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {apiLogger} from "../logger/logger.js";

export const ping = async (req, res) => {
    res.status(200).send("The server works ok")
}

export const signUp = async (req, res) => {
    try {
        const userExisted = await User.findOne({ username: req.body.username })
        if (userExisted) {
            return res.status(409).json({
                message: `User with username ${req.body.username} existed`
            })
        }

        const newUser = new User(req.body)
        await newUser.save();

        console.log(apiLogger(req), `Created user with username : ${req.body.username}`)

        res.status(201).json({
            message: `Created user ${req.body.username}`
        })
    } catch (error) {
        console.error(apiLogger(req), `Error ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Username or Password is incorrect' });

        const token = jwt.sign({
            id: user._id,
            username : user.username,
            fullName : user.fullName
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(apiLogger(req), `Authenticated user : ${username}`)
        res.status(200).json({ token });
    } catch (error) {
        console.error(apiLogger(req), `Error ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}
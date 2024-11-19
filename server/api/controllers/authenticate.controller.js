import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

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

        res.status(201).json({
            message: `Created user ${req.body.username}`
        })
    } catch (error) {
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Logged user", user)
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : error.message
        })
    }
}
import User from '../models/user.model.js'

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
            message : error
        })
    }
}
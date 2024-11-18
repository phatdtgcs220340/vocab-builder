const validateRegistration = (req, res, next) => {
    const { username, fullName, password } = req.body;

    if (!username || !fullName || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    next();
};

export { validateRegistration }
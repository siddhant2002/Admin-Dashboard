const User = require('../modals/userModel');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const { email, username, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({
            status: "success",
            data: {
                email, username, password: hashedPassword
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email }).select('+password');
        console.log(validUser)
        if (!validUser) {
            return next(errorHandler(404, 'User not found!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        validUser.password = undefined;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(validUser);

    } catch (error) {
        next(error);
    }
};

exports.signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};
const User = require('../modals/userModel');
const { errorHandler } = require('../utils/error');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(
            users
        );
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) return next(errorHandler(404, 'User Not Find!'));

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(
            updatedUser
        );
    } catch (error) {
        next(error);
    }
}
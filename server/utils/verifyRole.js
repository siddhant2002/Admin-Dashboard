const User = require('../modals/userModel');
const { errorHandler } = require('./error');

exports.verifyAdmin = async (req, res, next) => {

    try {
        req.user = await User.findById({ _id: req.user.id });
        if (req.user.role !== 'admin') return next(errorHandler(403, 'Access denied!'));
        next();
    } catch (error) {
        next(error);
    }
}
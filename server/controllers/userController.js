const User = require('../modals/userModel');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error');

exports.updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(403, 'You can only update your own account!'));

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                active: req.body.active
            }
        }, { new: true });
        console.log(updatedUser);
        updatedUser.password = undefined;
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}
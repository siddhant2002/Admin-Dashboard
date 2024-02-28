const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

userSchema.pre(/^find/, function (next) {
    //this points to the current query
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;


const mongoose = require('mongoose');

const Password = require('../services/password');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
        versionKey: false
    }
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password') && this.password) {
        const hash = await Password.hash(this.password);
        this.set('password', hash);
    }

    next();
});

module.exports = mongoose.model('User', userSchema);
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const CustomError = require('../utils/custom-error');
const Password = require('./password');

exports.createUser = async (username, email, password) => {
    /**
     * Creates new user in database with given credentials
     * @param username, email, password
     * @returns user (newly created)
    **/
    var user = await User.findOne({email}).exec();
    if(user) {
        throw new CustomError('Email already exists');
    }

    user = new User({
        username,
        email,
        password
    });

    try {
        const data = await user.save();
        return data;
    }
    catch(err) {
        throw err;
    }

};


exports.generateToken = async (email, password) => {
    /** 
     * Validates user credentials and generates jwt token 
     * 
     * @param email, password
     * @return {token, user}
    **/
    var user = await User.findOne({email}).exec();

    if(!user) {
        throw new CustomError('User doesn\'t exist');
    }

    try {
        const passwordMatch = await Password.verify(password, user.password);
        if(passwordMatch) {
            return {
                    token: jwt.sign({
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }, process.env.JWT_KEY),
                user
            }
        }

        throw new CustomError('Wrong Password', 403);
    }
    catch(err) {
        throw err;
    }

    
}
module.exports = exports;
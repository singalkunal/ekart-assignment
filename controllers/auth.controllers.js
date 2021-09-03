const { body } = require('express-validator');
require('express-async-errors');

// services
const { createUser, generateToken } = require('../services/userService');
const CustomError = require('../utils/custom-error');

exports.validate = (method) => {
    switch(method) {
        case 'signup': {
            return [
                body('username').exists().withMessage('Please provide a usename').trim().isLength({min: 1}).withMessage('Username can\'t be empty'),
                body('email').exists().withMessage('Please provide an email').trim().isEmail().withMessage('Enter a valid email'),
                body('password').exists().withMessage('Please provide a password')
            ]
        }
        case 'login': {
            return [
                body('email').exists().withMessage('Please provide an email').trim().isEmail().withMessage('Enter a valid email'),
                body('password').exists().withMessage('Please provide a password')
            ]
        }
    }
}

exports.signUpUser = async (req, res) => {
    const { username, email, password } = req.body;
    

    try {
        const user = await createUser(username, email, password);
        res.status(201).json({user})
    }
    catch(err) {
        if(err.name === 'custom-error') {
            throw err;
        }
        
        return res.status(500).send({ msg: 'Something went wrong', success: false });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await generateToken(email, password);
        return res.status(200).send(data);
    }
    catch(err) {
        console.log(err);
        if(err.name === 'custom-error') {
            throw err;
        }
        
        return res.status(500).send({ msg: 'Something went wrong', success: false });
    }
}
module.exports = exports;
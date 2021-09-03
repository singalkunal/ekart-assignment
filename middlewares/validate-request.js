const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    var errors = validationResult(req).array();
    if(errors.length) {
        return res.status(400).send({success: false, errors});
    }

    next();
}
module.exports = (err, req, res, next) => {
    if(err.name && err.name === 'custom-error') {
        return res.status(err.statusCode).json({errors: err.serializeErrors()});
    }
    res.status(400).send({errors: err});
}
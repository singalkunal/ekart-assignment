const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    /**
     * Decodes Bearer token in authorization header
    **/
    const bearerHeader = req.headers['authorization'];
    
    if(bearerHeader) {
        try {
            const token = bearerHeader.split(' ')[1];
            req.token = jwt.verify(token, process.env.JWT_KEY);
            next();
        }
        catch(err) {
            console.log('Error occured while decoding token...', err);

            return res.status(500).send({
                msg: 'Error occured while decoding token...',
                success: false,
                error: err
            });
        }
        
    }
    else {
        return res.status(401).send({ msg: 'Not Authorized', success: false });
    }

}
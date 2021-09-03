class CustomError extends Error {
    constructor(msg, statusCode) {
        super('Something went wrong...');

        Error.captureStackTrace(this, this.constructor);
        this.name = 'custom-error';
        this.statusCode = statusCode || 400;
        this.msg = msg;
    }

    serializeErrors() {
        return [{msg: this.msg}]
    }
};

module.exports = CustomError;
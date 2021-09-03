const {scrypt, randomBytes} = require('crypto');

module.exports = class Password {
    static async hash(password) {
        const salt = randomBytes(16).toString('hex');
        return new Promise((resolve, reject) => {
            scrypt(password, salt, 64, (err, derivedKey) => {
                if(err) reject(err);
                resolve(`${salt}:${derivedKey.toString('hex')}`);
            });
        })
     
    }

    static async verify(password, hash) {
        return new Promise((resolve, reject) => {
            const [salt, key] = hash.split(':');
            scrypt(password, salt, 64, (err, derivedKey) => {
                 if(err) reject(err);
                 resolve(key === derivedKey.toString('hex'));
            })
        })
    }
};
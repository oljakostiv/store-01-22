const jwt = require('jsonwebtoken');
const { errorHandler: { unauthorized } } = require('../errors');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const tokenFromHeader = req.headers.authorization.split(' ')[1]; //бо перше тип, а тоді сам токен;

        if (!tokenFromHeader) {
            return next(unauthorized());
        }

        const decoded = jwt.verify(tokenFromHeader, 'secret_key');

        req.user = decoded;

        next();
    } catch (e) {
        next(unauthorized());
    }
}


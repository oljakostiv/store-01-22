const jwt = require('jsonwebtoken');
const { errorHandler: { unauthorized, forbidden } } = require('../errors');

module.exports = function(role) {
   return  function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const tokenFromHeader = req.headers.authorization.split(' ')[1]; //бо перше тип, а тоді сам токен;

            if (!tokenFromHeader) {
                return next(unauthorized());
            }

            const decoded = jwt.verify(tokenFromHeader, 'secret_key');

            if (decoded.role !== role) {
                return next(forbidden());
            }

            req.user = decoded;

            next();
        } catch (e) {
            next(unauthorized());
        }
    }
}

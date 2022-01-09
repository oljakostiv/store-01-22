const { errorHandler: { badRequest } } = require('../errors');

class UserController {
    async registration(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    };

    async login(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    };

    async checkAuth(req, res, next) {
        try {
            const { id } = req.query;

            if (!id) {
               return  next(badRequest('Send ID'))
            }

            res.json(id);
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new UserController();

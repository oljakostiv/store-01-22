const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');
const { errorHandler: { badRequest } } = require('../errors');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        'secret_key',
        {expiresIn: '24h'}
    )
};

class UserController {
    async registration(req, res, next) {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return next(badRequest('Email or password is wrong'));
            }

            const candidate = await User.findOne({ where: { email } });

            if (candidate) {
                return next(badRequest(`User with email ${ email } is exist`));
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, role, password: hashPassword });

            const basket = await Basket.create({ userId: user.id });

            const token = generateJwt(user.id, user.email, user.role);

            res.json({ token, user });
    };

    async login(req, res, next) {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return next(badRequest('User not found'));
            }

            const comparePass = await bcrypt.compare(password, user.password);

            if (!comparePass) {
               return next(badRequest('User not found!'));
            }

            const token = generateJwt(user.id, user.email, user.role);

            res.json({ token });
    };

    async checkAuth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        res.json({ token });
    };
}

module.exports = new UserController();

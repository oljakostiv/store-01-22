const routes = require('express').Router();
const { userController: { registration, login, checkAuth } } = require('../controllers');
const { authMiddleware } = require('../middlewares');

routes.post('/registration', registration);
routes.post('/login', login);
routes.get('/auth', authMiddleware, checkAuth);

module.exports = routes;

const routes = require('express').Router();
const { userController: { registration, login, checkAuth } } = require('../controllers');

routes.post('/registration', registration);
routes.post('/login', login);
routes.get('/auth', checkAuth);

module.exports = routes;

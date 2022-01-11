const routes = require('express').Router();
const { brandController: { create, getAll } } = require('../controllers');
const { checkRoleMiddleware } = require('../middlewares');

routes.post('/', checkRoleMiddleware('ADMIN'), create);
routes.get('/', getAll);

module.exports = routes;

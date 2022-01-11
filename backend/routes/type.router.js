const routes = require('express').Router();
const { typeController: { create, getAll } } = require('../controllers');
const { checkRoleMiddleware } = require('../middlewares');

routes.post('/', checkRoleMiddleware('ADMIN'), create);
routes.get('/', getAll);

module.exports = routes;

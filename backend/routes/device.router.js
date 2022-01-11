const routes = require('express').Router();
const { deviceController: { create, getAll, getById } } = require('../controllers');
const { checkRoleMiddleware } = require('../middlewares');

routes.post('/', checkRoleMiddleware('ADMIN'), create);
routes.get('/', getAll);
routes.get('/:id', getById);

module.exports = routes;

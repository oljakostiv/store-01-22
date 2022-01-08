const routes = require('express').Router();
const { deviceController: { create, getAll, getById } } = require('../controllers');

routes.post('/', create);
routes.get('/', getAll);
routes.get('/:id', getById);

module.exports = routes;

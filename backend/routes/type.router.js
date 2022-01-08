const routes = require('express').Router();
const { typeController: { create, getAll } } = require('../controllers');

routes.post('/', create);
routes.get('/', getAll);

module.exports = routes;

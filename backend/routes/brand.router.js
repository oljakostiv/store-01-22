const routes = require('express').Router();
const { brandController: { create, getAll } } = require('../controllers');

routes.post('/', create);
routes.get('/', getAll);

module.exports = routes;

const routes = require('express').Router();
const brandRouter = require('./brand.router');
const deviceRouter = require('./device.router');
const typeRouter = require('./type.router');
const userRouter = require('./user.router');

routes.use('/brand', brandRouter);
routes.use('/device', deviceRouter);
routes.use('/type', typeRouter);
routes.use('/user', userRouter);

module.exports = routes;


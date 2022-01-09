require('dotenv').config();
const express = require('express');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const sequelize = require('./db');
const models = require('./models/models');
const { errorApiMiddleware } = require('./middlewares');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(expressFileUpload({}));
app.use('/api', require('./routes'));
app.use(errorApiMiddleware) //нема next, робота завершилась, тому завжди вкінці;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); //звіряє

        app.listen(PORT, () => {
            console.log(`Welcome, Boss! Port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();



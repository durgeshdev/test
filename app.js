'use strict';

const express = require('express');
const app = express();
module.exports = app; // for testing

const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

app.use('/roomchat', express.static(path.join(__dirname, 'public')));
app.use('/userchat', express.static(path.join(__dirname, 'users')));

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'; //development

require('./config/db');
require('./config/documentClient.js');

app.use(express.json());
app.use(cors())

const appRoutes = require("./api/routes/App");
app.use(appRoutes);


//Display req logs in lcaal & DEV only
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
// Serve the Swagger documents and Swagger UI
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.disable('x-powered-by');

const server = require('http').createServer(app);

// const io = require('./api/routes/socket')(server);
// Make socket.io accessible to routes
app.use(function (req, res, next) {
    // req.io = io;
    next();
});

const port = process.env.PORT || 10010;
server.listen(port, () => console.log(`Listening on port ${port}`));
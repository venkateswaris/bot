'use strict';

var DeployBot = require('./app.js');

var bot = new DeployBot({
    token: process.argv[2],
    username: process.argv[3],
    password: process.argv[4]
});
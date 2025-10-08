const serverless = require('serverless-http');
const app = require('../server/server'); // ensure server/server.js exports the app
module.exports = (req, res) => serverless(app)(req, res);
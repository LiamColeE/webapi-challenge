const express = require("express");
const server = express();
const projectRoute = require("./routes/projectRoute");
server.use(projectRoute);
const actionRoute = require("./routes/actionRoute");
server.use(actionRoute);





module.exports = server;
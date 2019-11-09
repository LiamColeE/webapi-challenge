const express = require("express");
const server = express();
const projectRoute = require("./routes/projectRoute");
server.use(projectRoute);
const actionRoute = require("./routes/actionRoute");
server.use(actionRoute);

server.get('/', (req,res) => {
        res.send("Server is available")
        res.status(200);
})

module.exports = server;
const express = require("express");
const server = express();
const projectRoute = require("./routes/projectRoute");
server.use(projectRoute);
const actionRoute = require("./routes/actionRoute");
server.use(actionRoute);



function logger(req, res, next) {
    let date = new Date();
    console.log("Method: " + req.method + ", URL: " + req.url + ", At " + date.getMonth() + "/" + date.getDay()
        + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());

    next();
};


module.exports = server;
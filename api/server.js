const express = require("express");
const helmet = require("helmet");
const resourceRouter = require("./resource/router.js");
const projectRouter = require("./project/router.js");
const taskRouter = require('./task/router.js')

const server = express();

server.use(helmet(), express.json());
server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

server.get("/", (req, res, next) => {
  res.status(200).json({ message: "api up" });
});

server.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Server failed...";
  res.status(errorStatus).json({ message: errorMessage, stack: error.stack });
});

module.exports = server;

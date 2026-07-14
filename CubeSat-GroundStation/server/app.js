const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const config = require("./config");
const logger = require("./logger");

const socketManager = require("./socket");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
socketManager.initialize(io);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    logger.info("Client connected");

    socket.on("disconnect", () => {
        logger.warning("Client disconnected");
    });
});

server.listen(config.server.port, () => {
    logger.info(`🚀 Ground Station running at http://localhost:${config.server.port}`);
});
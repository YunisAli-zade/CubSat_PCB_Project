const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
    console.log("✅ Client connected");

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Ground Station running at http://localhost:${PORT}`);
});
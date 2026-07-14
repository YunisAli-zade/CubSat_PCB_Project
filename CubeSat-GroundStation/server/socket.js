/**
 * ==========================================
 * CubeSat Ground Station
 * Module: Socket.IO
 * ==========================================
 */

let io = null;

function initialize(socketServer) {
    io = socketServer;
}

function broadcastTelemetry(data) {
    if (!io) return;

    io.emit("telemetry", data);
}

module.exports = {
    initialize,
    broadcastTelemetry
};
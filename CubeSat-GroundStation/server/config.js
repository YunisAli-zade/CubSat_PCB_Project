const config = {
    server: {
        port: 3000
    },

    serial: {
        port: "COM6",
        baudRate: 115200,
        reconnectInterval: 3000
    },

    telemetry: {
        updateRate: 1000
    }
};

module.exports = config;
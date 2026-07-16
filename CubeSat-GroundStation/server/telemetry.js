/**
 * ==========================================
 * CubeSat Ground Station
 * Module: Telemetry
 * ==========================================
 */

const socket = require("./socket");

function parseTelemetry(line) {

    const parts = line.trim().split(",");

    if (parts.length !== 10) {
        return null;
    }

    const values = parts.map(Number);

    if (values.some(Number.isNaN)) {
        return null;
    }

    return {

        timestamp: new Date().toISOString(),

        pressure: values[0],

        temperature: values[1],

        altitude: values[2],

        accel: {

            x: values[3],
            y: values[4],
            z: values[5]

        },

        gyro: {

            x: values[6],
            y: values[7],
            z: values[8]

        },

        mpuTemperature: values[9]

    };

}

function processTelemetry(line) {

    const telemetry = parseTelemetry(line);

    if (!telemetry) {
        return;
    }

    console.log("Telemetry Parsed:", telemetry);

    socket.broadcastTelemetry(telemetry);

}

module.exports = {
    processTelemetry
};
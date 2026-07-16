/**
 * ==========================================
 * CubeSat Ground Station
 * Module: Serial Communication (Auto Detect)
 * ==========================================
 */

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const logger = require("./logger");
const telemetry = require("./telemetry");

const TARGET_VENDOR = "16C0";
const TARGET_PRODUCT = "0483";

let port = null;

async function findTeensy() {
    const ports = await SerialPort.list();

    return ports.find(p =>
        p.vendorId?.toUpperCase() === TARGET_VENDOR &&
        p.productId?.toUpperCase() === TARGET_PRODUCT
    );
}

async function connect() {

    try {

        const device = await findTeensy();

        if (!device) {

            logger.warning("Teensy not found. Retrying in 3 seconds...");

            setTimeout(connect, 3000);

            return;
        }

        logger.info(`Teensy found on ${device.path}`);

        port = new SerialPort({

            path: device.path,
            baudRate: 115200,
            autoOpen: false

        });

        port.open((err) => {

            if (err) {

                logger.error(err.message);

                setTimeout(connect, 3000);

                return;

            }

            logger.info("Serial Connected");

        });

        const parser = port.pipe(

            new ReadlineParser({

                delimiter: "\n"

            })

        );

        parser.on("data", (line) => {

            telemetry.processTelemetry(line);

        });

        port.on("close", () => {

            logger.warning("Serial Disconnected");

            setTimeout(connect, 3000);

        });

        port.on("error", (err) => {

            logger.error(err.message);

        });

    } catch (err) {

        logger.error(err.message);

        setTimeout(connect, 3000);

    }

}

module.exports = {

    connect

};
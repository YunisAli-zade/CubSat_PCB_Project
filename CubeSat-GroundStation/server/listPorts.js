const { SerialPort } = require("serialport");

async function main() {
    const ports = await SerialPort.list();

    console.log(JSON.stringify(ports, null, 2));
}

main().catch(console.error);
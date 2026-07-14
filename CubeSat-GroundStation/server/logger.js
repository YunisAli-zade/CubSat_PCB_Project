function getTime() {
    return new Date().toLocaleTimeString();
}

function info(message) {
    console.log(`[${getTime()}] INFO: ${message}`);
}

function warning(message) {
    console.warn(`[${getTime()}] WARNING: ${message}`);
}

function error(message) {
    console.error(`[${getTime()}] ERROR: ${message}`);
}

module.exports = {
    info,
    warning,
    error
};
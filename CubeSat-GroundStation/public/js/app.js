const socket = io();

const status = document.getElementById("connectionStatus");

const pressure = document.getElementById("pressure");
const temperature = document.getElementById("temperature");
const altitude = document.getElementById("altitude");

socket.on("connect", () => {

    status.textContent = "🟢 Connected";
    status.classList.remove("disconnected");
    status.classList.add("connected");

    console.log("Connected");

});

socket.on("disconnect", () => {

    status.textContent = "🔴 Disconnected";
    status.classList.remove("connected");
    status.classList.add("disconnected");

    console.log("Disconnected");

});

socket.on("telemetry", (data) => {

    console.log(data);

    pressure.textContent =
        data.pressure.toFixed(2) + " hPa";

    temperature.textContent =
        data.temperature.toFixed(2) + " °C";

    altitude.textContent =
        data.altitude.toFixed(2) + " m";

});
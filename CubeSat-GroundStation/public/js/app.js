const socket = io();

const status = document.getElementById("connectionStatus");

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
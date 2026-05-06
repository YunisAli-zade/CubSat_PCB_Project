const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const SERIAL_PATH = "COM6";   // <-- öz portunu yaz
const BAUD_RATE   = 115200;
const HTTP_PORT   = 3000;

const port = new SerialPort({ path: SERIAL_PATH, baudRate: BAUD_RATE });

port.on("open",  () => console.log(`[SERIAL] Açıldı: ${SERIAL_PATH}`));
port.on("error", (e) => console.error("[SERIAL] Xəta:", e.message));

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

parser.on("data", (raw) => {
  const data = raw.trim();
  if (!data) return;

  const parts = data.split(",");

  if (parts.length !== 10) {
    console.warn("[FORMAT XƏTA] Gözlənilən 10, alınan:", parts.length, "→", data);
    return;
  }

  const [pressure, ms_temp, altitude,
         ax, ay, az,
         gx, gy, gz,
         mpu_temp] = parts.map(Number);

  if ([pressure, ms_temp, altitude, ax, ay, az, gx, gy, gz, mpu_temp].some(isNaN)) {
    console.warn("[NaN XƏTA]", data);
    return;
  }

  const payload = {
    pressure, ms_temp, altitude,
    ax, ay, az,
    gx, gy, gz,
    mpu_temp,
    timestamp: Date.now()
  };

  console.log("[TELEMETRY]", payload);
  io.emit("telemetry", payload);
});

io.on("connection", (socket) => {
  console.log("[SOCKET] Client bağlandı:", socket.id);
  socket.on("disconnect", () => console.log("[SOCKET] Client ayrıldı:", socket.id));
});

http.listen(HTTP_PORT, () => console.log(`[SERVER] http://localhost:${HTTP_PORT}`));
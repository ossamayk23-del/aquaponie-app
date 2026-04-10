const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = new SerialPort({
  path: "COM5",
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

port.on("open", () => console.log("✅ Port COM5 ouvert !"));
port.on("error", (err) => console.error("❌ Erreur du port :", err.message));

parser.on("data", (data) => {
  console.log("📡 RAW :", data);

  // 🔥 Nettoyage de la donnée ArdSuino
  const match = data.match(/([\d.]+)/);

  if (match) {
    const temperature = parseFloat(match[1]);

    console.log("🌡️ TEMP :", temperature);

    // envoi au front
    io.emit("temperature", temperature);
  }
});

app.use(express.static("public"));

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
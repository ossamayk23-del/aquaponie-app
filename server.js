const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ⚠️ Remplace par ton port Arduino (ex: COM3)
const port = new SerialPort("COM5", { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: "\n" }));

parser.on("data", (data) => {
  console.log(data);
  io.emit("temperature", data);
});

app.use(express.static("public"));

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
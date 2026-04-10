const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// ⚠️ Vérifie que le path correspond bien à ton Arduino
const port = new SerialPort({ path: "COM5", baudRate: 9600 });

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

port.on("open", () => {
  console.log("Port COM5 ouvert !");
});

port.on("error", (err) => {
  console.error("Erreur du port :", err.message);
});

parser.on("data", (data) => {
  console.log("Données reçues :", data);
});


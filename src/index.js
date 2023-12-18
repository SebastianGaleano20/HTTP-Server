import http from "node:http"; //const http = require("node:http");
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);

const port = process.env.PORT;

//Descriminando el metodo en la peticion:
const serverhttp = http.createServer((req, res) => {
  switch (req.method) {
    case "POST":
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf8",
        });

        res.end(body);
      });
      break;

    case "GET":
      res.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
      res.end("Solicitud GET recibida");
      break;
    default:
      res.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
      res.end("Solicitud recibida");
      break;
  }
});

serverhttp.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

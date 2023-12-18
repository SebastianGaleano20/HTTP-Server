import http from "node:http"; //const http = require("node:http");
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

//Descriminando el metodo en la peticion:
const serverhttp = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf8",
      });
      if (req.url === "/Inicio") {
        res.end("Solicitud GET recibida");
      } else {
        res.end("Peticion url incorrecta");
      }
      break;
    case "POST":
        res.writeHead(200, {
          "Content-Type": "application/json; charset=utf8",
        });
       if(req.url === '/products'){
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on('end',()=>{
            res.end(body);
        });
        }else{
            res.end('Peticion POST incorrecta')
        }
      break;
    }});
serverhttp.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

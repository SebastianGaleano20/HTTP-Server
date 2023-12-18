import http from "node:http"; //const http = require("node:http");

const serverhttp = http.createServer((request,response)=>{
    response.writeHead(200, "Content-Type", "text/plain");
   response.end("<h1>Hola miguel</h1>")
});

serverhttp.listen(3000, ()=>{
    console.log("Listening on http://localhost:3000/");
});
import { randomUUID } from "node:crypto";
import http from "node:http"; //const http = require("node:http");

//Peticion Libre, sin discriminar el tipo de metodo indicado
/* const serverhttp = http.createServer((request,response)=>{
    response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});

    const data = {
        id: randomUUID(),
        name: "Sebastían",
        lastName: "Galeano"
    }
    const jsonData = JSON.stringify(data)
   response.end(jsonData);
});*/

const serverhttp = http.createServer((req,res) =>{
    
console.log(req.method);
    switch(req.method){
        case 'GET':
            res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
            res.end('Solicitud GET recibida');
            break;
        case 'POST':
            res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
            res.end('Solicitud POST recibida');
            break;
        default:
            res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
            res.end('Solicitud recibida');
            break;
    }
});

serverhttp.listen(3000, ()=>{
    console.log("Listening on http://localhost:3000/");
});
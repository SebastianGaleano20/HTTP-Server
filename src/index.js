import http from "node:http"; //const http = require("node:http");
import dotenv from "dotenv";
import fs, { read } from "node:fs";
dotenv.config();

const port = process.env.PORT;

const readDb = () => {
  const productsBuffer = fs.readFileSync("./src/database/products.json");
  const productParsed = JSON.parse(productsBuffer.toString());
  return productParsed;
};

//Descriminando el metodo en la peticion:
const serverhttp = http.createServer((req, res) => {

  const products = readDb();

  if (req.method === "GET" && req.url === "/") {

    const responseServer = {
      status: 200,
      app: "http-server-utn",
      routes: {
        index: "/",
        getProducts: "/product",
        addProducts: "/product",
      },
    };

    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(JSON.stringify(responseServer));

  } else if (req.method === "GET" && req.url === "/product") {
    const productParsed = readDb();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productParsed));
  } else if (req.method === "POST" && req.url === "/product") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newProduct = JSON.parse(body);
      products.push(newProduct);

      fs.writeFileSync(
        "./src/database/products.json",
        JSON.stringify(products)
      );
    });

    res.end("Producto agregado con exito");

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Peticion incorrecta");
  }
});
serverhttp.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

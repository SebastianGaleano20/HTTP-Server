- Protocolo HTTP

Indicaciones de los pasos y comandos ejecutados en este proyecto!
(Aclaro que tiene 2 index ya que estos pasos fueron en simultaneo viendo las ultimas 2 clases y decidi juntar todo el proyecto en 1 solo. Resumiendo el proceso de la aplicacion desde inicio a fin)

<!-- Iniciamos nuestro proyecto: -->

- npm init --y (-y instala los valores por defecto)
  En nuestro archivo package.json definimos nuestros scripts:
- "scripts":(
  "dev": "node --watch src/index.js"
  )
  esto nos permite ejecutar en nuestra terminal nuestro proyecto indicandole el archivo principal que contiene nuestro servidor.
  --watch es una herramienta incorporada en node para que nuestro archivo se vuelva a ejecutar en la terminal cada vez que reciba un cambio en el mismo.

<!-- Creamos las carpetas y archivos a utilizar en nuestro proyecto: -->

- En terminal: mkdir (para carpetas) - touch (para archivos)
- src: carpeta que contiene nuestros archivos principales
- database: carpeta que contiene nuestro archivo json para nuestra base de datos
- products.json: es nuestro archivo JSON que contiene nuestra base de datos
- index.js: archivo principal que ejecuta nuestra aplicacion/proyecto
- .env: es nuestra variable de entorno que contiene nuestro PORT y HOST
- .env.example: es nuestro archivo que es subido luego a nuestro repositorio git
- .gitignore: es nuestro archivo que contiene el nombre de nuestros archivos a ignorar en caso de subirlo a un repositorio git

<!-- Para que nuestro proyecto pueda utilizar modulos debo indicarselo en el archivo package.json. : -->

- "type": "module"

<!-- Creamos nuestro servidor http: -->

- import http from "node:http" - Para importar el modulo http y poder utilizarlo
- const serverhttp = http.createServer() - Para guardar en una variable la funcion que crea nuestro servidor http
  http.createServer( (request,response)=>{})
  los callback http siempre retornan un objeto con 2 propiedades:
- request (Lo que le pido al servidor) - response (Lo que me responde el servidor)
  La request es la peticion que se realiza desde el navegador en el input de URL.
  Siempre es un metodo GET.
- serverhttp.listen() es nuestra funcion para colocar nuestro servidor en un puerto.

<!-- De forma nativa, le indicamos al servidor los headers (encabezados que contienen informacion): -->

- response.writeHead() - se utiliza para indicarle al servidor que contenido envio a la respuesta.
- "Content-Type" se utiliza para filtrar el tipo de contenido que muestra la respuesta
- "Content-Type" - "text/plain" (texto plano) - Le indico que el contenido va a ser de tipo texto plano.
- "Content-Type" - "text/html" - Le indico que el contenido contiene elementos html.
- "Content-Type" - "application/json" - Le indico que el contenido responde json data.
- response.writeHead(200, {"Content-Type": "application/json; charset=utf8"}); Nos permite utilizar tildes y ñ.

<!-- Peticion Libre, sin discriminar el tipo de metodo indicado -->

const serverhttp = http.createServer((request,response)=>{
response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});

    const data = {
        id: randomUUID(),
        name: "Sebastían",
        lastName: "Galeano"
    }
    const jsonData = JSON.stringify(data)

response.end(jsonData);
});

<!-- Instalamos una extension para poder realizar una petision POST. (RapiAPIClient por ej) -->

<!-- Creamos nuestra app para recibir peticiones de tipo GET y POST. -->

- Podemos utilizar if/else o switch para indicar las peticiones y sus retornos.
- request.method es nuestra peticion a evaluar y en caso de coincidir realizara una accion la cual muestra informacion de nuestra aplicacion.
  Ejemplo con if/else:
  const serverhttp = http.createServer((req,res) =>{
- if(request.method === "GET") {  
   response.writeHead(200, {
    "Content-Type": "application/json; charset=utf8"
    });
   response.end("Solicitud GET recibida);
  } else if(request.method === "POST){
   response.writeHead(200, {
    "Content-Type": "application/json; charset=utf8"
    });
   response.end("Solicitud POST recibida);
  }
  });

- const serverhttp = http.createServer((req,res) =>{
  switch(req.method){
  case 'GET':
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf8"
        });
      res.end('Solicitud GET recibida');
      break;
   case 'POST':
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf8"
        });
   res.end('Solicitud POST recibida');
   break;
   default:
   res.writeHead(200, {
    "Content-Type": "application/json; charset=utf8"
    });
   res.end('Solicitud recibida');
   break;
 }
});
En cada caso res.end finaliza cada operacion realizada.

<!-- Enviamos datos del servidor mediante el metodo POST: -->

- En case POST:
  creamos una variable para guardar el contenido de body
- body: Es el contenido del cuerpo del mensaje en los servidores http (tanto en la req y la res).
  let body = '';

<!-- Luego creamos una funcion que recibira nuestra data. -->

res.on('data', (chunk)=>{
body += chunk;
})
En el evento data, recibiremos datos fragmentados llamados habitualmente chunk, estos datos los enviaremos a la variable anteriormente creada body, utilizando el operador += para sumar el valor a body.

en el evento end mostramos como respuesta el valor recibido desde el servidor.
req.on("end", () => {

- Le indicamos que response va a mostrar en pantalla que tipo de contenido:
  res.writeHead(200, {
  "Content-Type": "application/json; charset=utf8",
  });
- Finalizamos mostrando body.
  res.end(body); })

<!-- Instalamos dotenv para crear la variable de entorno: -->

- npm i dotenv
  importamos dotenv
  import dotenv from "dotenv"

<!-- Configuramos nuestro puerto en una constante para utilizarla en nuestra aplicación -->

const port = process.env.PORT;

<!--- Configuramos las RUTAS de nuestro proyecto --->

- Dentro del switch utilizamos un if para configurar que response.url === a la url que le indiquemos:
   case "GET":
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf8",
      });
      if (req.url === "/products") {
       const productParsed = readDb();
       const productJSON = JSON.stringify(productParsed);
       
        res.end(productJSON);
      } else {
        res.end("Peticion url incorrecta");
      }
      break;
  <!-- Configuramos POST -->
  Al configurar POST podemos indicar URL para recibir informacion y mostrarla en pantalla.
- case "POST":
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
  <!-- Creamos nuestra base de datos / Array en formato JSON en nuestra carpeta database -->
<!-- Importamos fs para acceder a la base de datos -->
- import fs from 'node:fs'

<!-- Creamos una condicion y utilizamos fs para nuestro primer endpoint -->
- Los endpoint son las url que nos retornan informacion.
- if (req.url === "/products") - Para que coincida la url con la peticion y poder mostrarle la lista de productos
- const productsBuffer = fs.readFileSync(' ') - recibimos dentro del if creado la informacion de nuestra base de datos recibida como parametro en el metodo readFileSync en formato Buffer.
- Convertimos la data buffer en data parseada:

        const productParsed = JSON.stringify(productsBuffer.toString());

- Convertimos por ultimo la data parseada en string:

        const productJSON = JSON.stringify(productParsed);

- Por ultimo response.end(productJSON); y en pantalla se muestra el contenido de la base de datos.

- Por buena practica, creamos una funcion readDb() para que lea nuestra base de datos: 

    const readDb = () =>{
    const productsBuffer = fs.readFileSync('./src/database/products.json');
    const productParsed = JSON.parse(productsBuffer.toString());
    return productParsed;

}

<!-- Creamos el endpoint en POST -->
- Leemos la base de datos guardandola en una variable:

        const products = readDb();

- y en el evento end le indicamos la accion de guardar la informacion recibida con el metodo POST reescribiendo la base de datos con modulos fs.

        req.on('end',()=>{
            const product = JSON.parse(body);
            products.push(product);
            fs.writeFileSync('./src/database/products.json', JSON.stringify(products))
            res.end('Producto agregado con exito');
        });

- La data recibida en body se debe parsear para luego pushearla y reescribirla con fs.writeFileSync a la base de datos. Por ultimo le mostramos al cliente un mensaje de exito.

<!-- Creamos un index refaccionado -->
- Creamos un nuevo index para finalizar el proyecto utilizando Rutas indicandole la ruta principal:

  
  if (req.method === 'GET' && req.url === "/") {
    const responseServer = {
      status: 200,
      app: "http-server-utn",
      routes: {
        index: "/",
        getProducts: "/products",
        addProducts: "/products",
      },
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(responseServer));
  }
- Con el codigo brindado validamos que el metodo sea GET y la url / para mostrar la ruta principal que es la muestra del objeto responseServer

- Ahora continuamos con else if agregando condiciones en la cual coincidan el metodo y la url para indicarle a la aplicacion que informacion debe mostrar. 
- El error 404, lo indicamos en la response.writeHead(404, {'Content-Type': 'text/plain'});

Gracias! 

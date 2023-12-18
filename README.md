- Protocolo HTTP

Indicaciones de los pasos y comandos ejecutados en este proyecto!

iniciamos nuestro proyecto:

- npm init --y (-y instala los valores por defecto)
  En nuestro archivo package.json definimos nuestros scripts:
- "scripts":(
  "dev": "node --watch src/index.js"
  )
  esto nos permite ejecutar en nuestra terminal nuestro proyecto indicandole el archivo principal que contiene nuestro servidor.
  --watch es una herramienta incorporada en node para que nuestro archivo se vuelva a ejecutar en la terminal cada vez que reciba un cambio en el mismo.

creamos las carpetas y archivos a utilizar en nuestro proyecto:

- En terminal: mkdir (para carpetas) - touch (para archivos)
- src: carpeta que contiene nuestros archivos principales
- database: carpeta que contiene nuestro archivo json para nuestra base de datos
- products.json: es nuestro archivo JSON que contiene nuestra base de datos
- index.js: archivo principal que ejecuta nuestra aplicacion/proyecto
- .env: es nuestra variable de entorno que contiene nuestro PORT y HOST
- .env.example: es nuestro archivo que es subido luego a nuestro repositorio git
- .gitignore: es nuestro archivo que contiene el nombre de nuestros archivos a ignorar en caso de subirlo a un repositorio git

Para que nuestro proyecto pueda utilizar modulos debo indicarselo en el archivo package.json. :

- "type": "module"

Creamos nuestro servidor http:

- import http from "node:http" - Para importar el modulo http y poder utilizarlo
- const serverhttp = http.createServer() - Para guardar en una variable la funcion que crea nuestro servidor http
  http.createServer( (request,response)=>{})
  los callback http siempre retornan un objeto con 2 propiedades:
- request (Lo que le pido al servidor) - response (Lo que me responde el servidor)
  La request es la peticion que se realiza desde el navegador en el input de URL.
  Siempre es un metodo GET.
- serverhttp.listen() es nuestra funcion para colocar nuestro servidor en un puerto.

De forma nativa, le indicamos al servidor los headers (encabezados que contienen informacion):

- response.writeHead() - se utiliza para indicarle al servidor que contenido envio a la respuesta.
- "Content-Type" se utiliza para filtrar el tipo de contenido que muestra la respuesta
- "Content-Type" - "text/plain" (texto plano) - Le indico que el contenido va a ser de tipo texto plano.
- "Content-Type" - "text/html" - Le indico que el contenido contiene elementos html.
- "Content-Type" - "application/json" - Le indico que el contenido responde json data.
- response.writeHead(200, {"Content-Type": "application/json; charset=utf8"}); Nos permite utilizar tildes y ñ.

//Peticion Libre, sin discriminar el tipo de metodo indicado
/\* const serverhttp = http.createServer((request,response)=>{
response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});

    const data = {
        id: randomUUID(),
        name: "Sebastían",
        lastName: "Galeano"
    }
    const jsonData = JSON.stringify(data)

response.end(jsonData);
});\*/

Instalamos una extension para poder realizar una petision POST. (RapiAPIClient por ej)

Creamos nuestra app para recibir peticiones de tipo GET y POST.

- Podemos utilizar if/else o switch para indicar las peticiones y sus retornos.
- request.method es nuestra peticion a evaluar y en caso de coincidir realizara una accion la cual muestra informacion de nuestra aplicacion.
  Ejemplo con if/else:
  const serverhttp = http.createServer((req,res) =>{
  if(request.method === "GET") {  
   response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
  response.end("Solicitud GET recibida);
  }else if(request.method === "POST){
  response.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
  response.end("Solicitud POST recibida);
  }
  });

const serverhttp = http.createServer((req,res) =>{
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
En cada caso res.end finaliza cada operacion realizada.

Enviamos datos del servidor mediante el metodo POST:

- En case POST:
  creamos una variable para guardar el contenido de body
- body: Es el contenido del cuerpo del mensaje en los servidores http (tanto en la req y la res).
  let body = '';

Luego creamos una funcion que recibira nuestra data.

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

Instalamos dotenv para crear la variable de entorno:

- npm i dotenv
  importamos dotenv
  import dotenv from "dotenv"

y configuramos nuestro puerto en una constante para utilizarla en nuestra aplicación
const port = process.env.PORT;


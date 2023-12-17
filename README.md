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




/* const http = require('http');

const server = http.createServer((req, res) => {
    res.status = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World');
});
server.listen(30001, () => {
    console.log('Serve on port 30001');
}); */
// en consola : npm init -y
//en consola : npt install express
//rutas:
const express = require('express');
const app = express();
const morgan = require('morgan');
//ruta para que pueda entender json

//all → funcion de express: para que se ejecute primero
/* app.all('/user', (req, res) => {
    console.log('Por aqui paso');
    res.send('finish'); */
//para iniciar
//esto es un middleware:
function logger(req, res, next){
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
app.use(express.json());
//app.use(logger);
app.use(morgan('dev'));
/* app.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    next();
}); */
//Enrutamiento
/* app.get('/user', (req,res) => {
    res.send('Peticion get recived');
}); */
//crearemos un objeto-json
app.get('/', (req, res) =>{
    const data = [{name : 'john'}, {name : 'joel'}, {name : 'cameron'}, ];
    res.render('index.ejs', {people: data});
});
app.get('/user', (req,res) => {
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });
});
//importancia de los dos puntos (:) para generar rutas dinamicas
app.post('/user/:id', (req,res) => {
    /* res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });*/
    //objeto que recive los datos:
    console.log(req.body);
    console.log(req.params); //permitira recivir el ID
    res.send('Post request received');
    
//key : Content-type, Value: application/json
});
//DESCARGA POSTMAN PARA textear las rutas - simulador de servidor
app.post('/about', (req,res) => {
    res.send('Post request recived');
    });
app.put('/contact/:id', (req,res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} update`);
});
// vamos
app.delete('/user/:userId', (req,res) => {
    res.send(`User ${req.params.userId} deleted`);
});
//Settings
app.set('AppName', 'Fazt Express Tutorial');
app.set('port', 3000);
app.set('view engine', 'ejs');
//Middlewares
app.use(express.static('public'));

app.listen(app.get('port'), () => {
    console.log(app.get('AppName'));
    console.log('Server on port', app.get('port'));
});
//console: npm install --save-dev nodemon / npm install -D  → reiniciador del servidor
//Console_: npx nodemon index.js

//SIGUIENTE TEMA: Middlewares
//instalaremos MORGAN : HTTP request logger middleware for node.js
//cmd: npx nodemon index.js

//SIGUIENTE TEMAS: Setings
//motor de plantilla(ejs)
//cmd: npm i ejs
import express from 'express';
const app = express();
const PORT = 8080 || process.env.PORT;


app.use(express.urlencoded({extended: true}))
app.use(express.json())


import productosRouter from './productos.js';
app.use('/api/productos', productosRouter);

import routerCarrito from './carrito.js';
app.use('/api/carrito', routerCarrito);

/*
const cors = require("cors");
app.use(cors({origin: "*"}))
*/


app.use('/static', express.static( "./src/assets"));

const server = app.listen(PORT, ()=>{
    console.log('servidor de express iniciado')
})
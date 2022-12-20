import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
import CarritosDaoArchivo from "./carritos/CarritosDaoArchivo.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritosDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import CarritosDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";
import persistencia from "./config.js";

import { config } from "dotenv";

config();



const instancias = [
    {
        nombre: ProductosDaoArchivo,
        id: 'archivo',
        descripcion:'producto'
    },
    {
        nombre: CarritosDaoArchivo,
        id: 'archivo',
        descripcion:'carrito'
    },
    {
        nombre:ProductosDaoMemoria,
        id:'memoria',
        descripcion:'producto'
    },
    {
        nombre:CarritosDaoMemoria,
        id:'memoria',
        descripcion:'carrito'
    },
    {
        nombre:ProductosDaoMongoDB,
        id:'mongo',
        descripcion:'producto'
    },
    {
        nombre:CarritosDaoMongoDB,
        id:'mongo',
        descripcion:'carrito'
    },
    {
        nombre:ProductosDaoFirebase,
        id:'firebase',
        descripcion:'producto'
    },
    {
        nombre:CarritosDaoFirebase,
        id:'firebase',
        descripcion:'carrito'
    }
]

//selección de las instancias que se van a importar según la palabra clave del archivo .env
const instancia = instancias.filter(i => i.id == persistencia);
console.log(instancia)
const resultado = {
    //producto o carrito           clase dao respectiva
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre
}


export default resultado;


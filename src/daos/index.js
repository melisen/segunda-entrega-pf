import ProductosDaoArchivo from "./productos/ProductosDaoArchivo.js";
import CarritosDaoArchivo from "./carritos/CarritosDaoArchivo.js";
import CarritosDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritosDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";

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
        nombre:CarritosDaoMemoria,
        id:'memoria',
        descripcion:'carrito'
    },
    {
        nombre:ProductosDaoMemoria,
        id:'memoria',
        descripcion:'producto'
    },
    {
        nombre:CarritosDaoMongoDB,
        id:'mongo',
        descripcion:'carrito'
    },
    {
        nombre:ProductosDaoMongoDB,
        id:'mongo',
        descripcion:'producto'
    },
    {
        nombre:CarritosDaoFirebase,
        id:'firebase',
        descripcion:'carrito'
    },
    {
        nombre:ProductosDaoFirebase,
        id:'firebase',
        descripcion:'producto'
    }

]

//selección de las instancias que se van a importar según la palabra clave del archivo .env
const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);

const resultado = {
    //producto o carrito           clase
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre
}

export default resultado;


import express from 'express';

const {Router} = express;
const productosRouter = Router();

import instancia from './src/daos/index.js';

const productos = new instancia.producto;





//middleware
let esAdmin = true;
const middlewareAdmin = (req, res, next)=>{
    if(esAdmin){
        next()
    }else{
        console.log('error: -1, ruta y método no autorizados')
        {error: -1, 'ruta y método no autorizados'}
    }
}


productosRouter.get('/:id?',   async (req, res)=>{
            //no lleva el middleware de admin
            const {id} = req.params;

            if(id){
                const listaProductos = await productos.listarPorID(id)
                res.json({productos: listaProductos})
            }else{
                const listaProductos = await productos.listarTodos()
                res.json({productos: listaProductos})
            }
            

        })
    
    
        productosRouter.use(middlewareAdmin)

        productosRouter.post('/', async (req, res)=>{
        //middleware
        const {nombre, descripcion, codigo, foto, precio, stock} = req.body; 
        let agregarProd = await productos.guardar({nombre, timestamp: Date.now(), descripcion, codigo, foto, precio, stock});
            res.json({agregado: agregarProd});
        })
    

//recibe y actualiza un producto según su id
productosRouter.put('/:id', async (req, res)=>{
            //middleware
            const {id} = req.params;
            const {nombre, descripcion, codigo, foto, precio, stock} = req.body;
            let reemplazo = await productos.actualizar(id, {nombre, timestamp: Date.now(), descripcion, codigo, foto, precio, stock})
            res.json({prodReemplazado: reemplazo})
        })
    

    //elimina 1 prod según su id
    productosRouter.delete('/:id', async (req, res)=>{
            //middleware
            const {id} = req.params;
            let eliminarProd = await productos.eliminar(id);
            res.json({eliminadoID: id})
    })

export default productosRouter;
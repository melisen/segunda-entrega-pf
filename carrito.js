import express from 'express';

const {Router} = express;
const routerCarrito = Router();

import instancia from './src/daos/index.js';

const carritos = new instancia.carrito;

routerCarrito.post('/', async (req, res)=>{
    const {...objeto} = req.body;
    let nuevoCarrito =  await carritos.guardar(objeto);
    res.json({guardado: objeto.id})

})

routerCarrito.delete('/:id', async (req, res)=>{
    const {id} = req.params
    let carritoEliminado = await carritos.eliminar(id)
    res.json({carritoEliminado: id})
})


routerCarrito.get('/:id/productos', async (req, res)=>{
    const {id} = req.params;
    let listado;
    if(id){
        listado = await carritos.listarPorID(id)
    }else{
        listado = await carritos.listarTodos()
    }
   
    res.json({productos: listado})
})

routerCarrito.post('/:id/productos', async (req, res)=>{
    const {id} = req.params;
    let {...nuevoCarrito} = req.body;
    let prodIncorporado = await carritos.guardar(nuevoCarrito);
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res)=>{
    const {id} = req.params;
    const {id_prod} = req.params;
    let productoEliminado = await carritos.eliminarProductoDelCarrito(id, id_prod)
})


export default routerCarrito;
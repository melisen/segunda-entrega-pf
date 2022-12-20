import {promises as fs} from 'fs';

class ContenedorArchivo{
    constructor(ruta){
        this.ruta = ruta;
    }

    async listarTodos() {
        try{
            const objetos = fs.readFile(this.ruta, 'utf-8');
            const res = await JSON.parse(objetos);
            return res
        }
        catch(err){
            return []
        }
    }

    async listarPorID(id){
            const objetos = fs.readFile(this.ruta, 'utf-8');
            const res = await JSON.parse(objetos);
            const buscado = res.find(ob => ob.id == id);
            if(buscado){
                return buscado
            }else{
                return {error: 'No encontrado'}
            }

    }

    async guardar(ob){
        try{
            const objs = this.listarTodos();
            let id;
            if (!objs || !objs.lenght){
                id =1
            }else{
                objs.forEach( ob =>{
                    id  = ob.id
                });
                id = id+1
            }
            const guardar = objs && objs.lenght ? [...objs, {...ob, id}] : {...ob, id};
            await fs.writeFile(this.ruta, JSON.stringify(guardar), {encoding:'utf-8'})
        }
        catch(error){
            return {error}
        }
    }

    async actualizar(objeto){
        try{ 
            const objs = this.listarTodos();
            const obj = await this.listarPorID(objeto.id);
            if (obj) {
                const newObjt = [...objs, obj]
                await fs.writeFile(this.ruta, JSON.stringify(newObjt), { encoding: 'utf-8'})
                return "Guardado con exito!"
            } else {
                throw new Error('No encontramos un item con ese id')
            }
        } 
        catch (error) {
            return { error }
        }
    }

    async eliminar(id){
        try{
            const objs = this.listarTodos();
        const obj = await this.listarPorID(objeto.id);
        if (!objs || !objs.lenght || !obj){
            return  {error:'No se encontró qué borrar'}
        } 
        const newObjs = objs.filter(ob => ob.id != id);
        await fs.writeFile(this.ruta, newObjs, {encoding:'utf-8'})
        }
        catch(err){
            return {err}
        }
    }

    async eliminarProductoDelCarrito(id, id_prod){
        try{
            const data = await fs.promises.readFile(this.ruta, 'utf-8');
            const arrCarritos = JSON.parse(data);
            let esteCarrito = arrCarritos.find(element => element.id == idCarrito);
            if(esteCarrito){
                let productosPrevios = esteCarrito.productos;
                let eliminarProd = productosPrevios.filter(el => el.id != idProd);
                let carritoSinProd = {...esteCarrito, productos:[...eliminarProd]}; 
                let nuevoArrCarritos = arrCarritos.map(element=>{
                    if(element.id == idCarrito){
                        return {...carritoSinProd};
                    }else{
                        return element
                    }
                })
                const stringNuevoArr = JSON.stringify(nuevoArrCarritos);
                let escribirNuevoArr = await fs.promises.writeFile(this.ruta, stringNuevoArr)
            }else{
                console.log('no existe este carrito')
            }
        }catch(err){
            console.log('Hubo un error: ', err)
        }
    }


}

export default ContenedorArchivo
import express from 'express';

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

let productos = [
    {
      id: 1,
      nombre: 'Escuadra',
      precio: 200,
    },
    {
      id: 2,
      nombre: 'Transportador',
      precio: 50,
    },
  ];
  
class Productos{
    listar(data){
       return data;
    }

    listarIndividual(productos,id){
        return productos.find((aProduct) => aProduct.id == id);  
    }

    almacenar(nombre,precio){
        const nuevoProducto = {
            id: productos.length + 1,
            nombre: nombre,
            precio: precio,
          };
        
          productos.push(nuevoProducto);
          return nuevoProducto;
    }
}

app.get('/api/productos/listar', (req, res) => {
    let array = new Productos();
    let lista = array.listar(productos);
    if (!lista) {
        res.status = 404;
        return res.json({
            error: 'No hay productos cargados',
        });
    }    
    res.json({
      data: lista,
    });
});

app.get('/api/productos/:id', (req, res) => {
    let array = new Productos();
    let id = req.params.id;
    let producto = array.listarIndividual(productos,id);

    if (!producto) {
      res.status = 404;
      return res.json({
        error: 'Producto no encontrado',
      });
    }

    res.json({
      data: producto,
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/productos/guardar', (req, res) => {
    let array = new Productos();
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    let producto = array.almacenar(nombre,precio);
    
  res.status = 201;
  res.json({
    data: producto,
  });
});


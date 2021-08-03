"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const puerto = 8080;
const server = app.listen(puerto, () => console.log('Server up en puerto', puerto));
server.on('error', err => {
  console.log('ERROR ATAJADO', err);
});
let productos = [{
  id: 1,
  nombre: 'Escuadra',
  precio: 200
}, {
  id: 2,
  nombre: 'Transportador',
  precio: 50
}];

class Productos {
  listar() {
    return 'data';
  }

  listarIndividual() {}

  almacenar() {}

}

app.get('/api/productos/listar', (req, res) => {
  let producto = new Productos();
  let lista = producto.listar();
  res.json({
    data: lista
  });
});
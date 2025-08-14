// Trabajo Práctico JavaScript - Arrays

const libros = [
  {
    id: 1,
    nombre: "El Principito",
    precio: 1000,
    stock: 10,
  },
  {
    id: 2,
    nombre: "1984",
    precio: 1500,
    stock: 0,
  },
  {
    id: 3,
    nombre: "El Alquimista",
    precio: 1200,
    stock: 8,
  },
  {
    id: 4,
    nombre: "El Hobbit",
    precio: 1800,
    stock: 0,
  },
];

// 2.1
console.log("--------------Ejercicio 2.1------------------");
function cantidadDeLibros(libros) {
  return libros.length;
}
console.log(cantidadDeLibros(libros));
console.log("----------------------------------------------");

// 2.2
console.log("--------------Ejercicio 2.2------------------");
function nombreDeLibro(libros, indice) {
  return libros[indice].nombre;
}
console.log(nombreDeLibro(libros, 1));
console.log(nombreDeLibro(libros, 3));
console.log("----------------------------------------------");

// 3.1
console.log("--------------Ejercicio 3.1------------------");
function precioDeLibro(libros) {
  for (const libro of libros) {
    console.log(`El libro ${libro.nombre} tiene un precio de $${libro.precio}`);
  }
}
precioDeLibro(libros);
console.log("----------------------------------------------");

// 3.2
console.log("--------------Ejercicio 3.2------------------");
function precioDeLibroForEach(libros) {
  libros.forEach(libro => {
    console.log(`Producto: ${libro.nombre}, Precio: $${libro.precio}`);
  });
}
precioDeLibroForEach(libros);
console.log("----------------------------------------------");

// 4.1
console.log("--------------Ejercicio 4.1------------------");
function agregarElementos(libros) {
  libros.push({
    id: 5,
    nombre: "Cien años de soledad",
    precio: 2000,
    stock: 5
  });
  libros.push({
    id: 6,
    nombre: "Don Quijote",
    precio: 2200,
    stock: 3
  });
  console.log("Se agregaron 2 libros al final del array");
  console.log(`Nueva cantidad de libros: ${libros.length}`);
}
agregarElementos(libros);
console.log("----------------------------------------------");

// 4.2
console.log("--------------Ejercicio 4.2------------------");
function eliminarUltimo(libros) {
  const libroEliminado = libros.pop();
  console.log(`Se elimino el libro: ${libroEliminado.nombre}`);
  console.log(`Nueva cantidad de libros: ${libros.length}`);
}
eliminarUltimo(libros);
console.log("----------------------------------------------");

// 4.3
console.log("--------------Ejercicio 4.3------------------");
function agregarAlInicio(libros) {
  libros.unshift({
    id: 0,
    nombre: "Patrones de Diseño",
    precio: 5000,
    stock: 7
  });
  console.log("Se agrego un libro al inicio del array");
  console.log(`Nueva cantidad de libros: ${libros.length}`);
}
agregarAlInicio(libros);
console.log("----------------------------------------------");

// 4.4
console.log("--------------Ejercicio 4.4------------------");
function eliminarPrimero(libros) {
  const libroEliminado = libros.shift();
  console.log(`Se elimino el libro: ${libroEliminado.nombre}`);
  console.log(`Nueva cantidad de libros: ${libros.length}`);
}
eliminarPrimero(libros);
console.log("----------------------------------------------");

// 4.5
const productosConStock = libros.filter(libro => libro.stock > 0);
console.table(productosConStock);
console.log("----------------------------------------------");

// 4.6
const nombresProductos = libros.map(libro => libro.nombre);
console.log(nombresProductos);

// 4.7
const idBuscado = 3; //puede ser cualquier otro
const productoEncontrado = libros.find(libro => libro.id === idBuscado);
if (productoEncontrado) {
  console.table([productoEncontrado]);
} else {
  console.log("No existe el producto buscado");
}

// 4.8
const productosOrdenados = [...libros].sort((a, b) => b.precio - a.precio);
console.table(productosOrdenados);
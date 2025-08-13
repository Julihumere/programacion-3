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

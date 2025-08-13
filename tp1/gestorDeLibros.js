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
console.log(libros.length);
console.log("----------------------------------------------");

// 2.2
console.log("--------------Ejercicio 2.2------------------");
console.log(libros[1].nombre);
console.log(libros[3].nombre);
console.log("----------------------------------------------");

// 3.1
console.log("--------------Ejercicio 3.1------------------");
for (const libro of libros) {
  console.log(`El libro ${libro.nombre} tiene un precio de $${libro.precio}`);
}

console.log("----------------------------------------------");

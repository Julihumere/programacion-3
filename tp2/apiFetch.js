import { writeFileSync } from "fs";
const urlApi = "https://fakestoreapi.com/";

const getProductos = async () => {
  return fetch(`${urlApi}/products`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log(
        "1. Recuperar la información de un número limitado de productos (GET)"
      );
      console.log(data);
      return data;
    })
    .catch((error) =>
      console.error(
        "Error al recuperar la información de los productos",
        error.message
      )
    );
};

await getProductos();

const getProductosLimitados = async (limit) => {
  return fetch(`${urlApi}/products?limit=${limit}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log(
        "-------------------------------------------------------------"
      );
      console.log(
        "2. Recuperar la información de un número limitado de productos (GET)"
      );
      console.log(data);

      console.log(
        "-------------------------------------------------------------"
      );
      console.log(
        "3. Persistir los datos de la consulta anterior en un archivo local JSON"
      );

      console.log("Guardando datos...");

      writeFileSync("Productos.json", JSON.stringify(data, null, 2));
      console.log("Datos almacenados en Productos.json");

      return data;
    })
    .catch((error) =>
      console.error(
        "Error al recuperar la información de los productos",
        error.message
      )
    );
};

await getProductosLimitados(2);

const agregarProducto = async (nuevoProducto) => {
  return fetch(`${urlApi}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoProducto),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log(
        "-------------------------------------------------------------"
      );
      console.log("4. Agregar un nuevo producto (POST)");
      console.log("Producto agregado exitosamente:");
      console.log(data);
      return data;
    })
    .catch((error) =>
      console.error("Error al agregar el producto", error.message)
    );
};

//Prueba
const productoNuevo = {
  title: "Computadora Apple MAC M4 Pro",
  price: 4000000,
  description: "Apple Mac M4 Pro es la mejor computadora que vas a encontrar en el mercado",
  image: "https://http2.mlstatic.com/D_NQ_NP_762067-MLA83571586133_042025-O.webp",
  category: "electronic",
};

await agregarProducto(productoNuevo);

const buscarProductoPorId = async (id) => {
  return fetch(`${urlApi}/products/${id}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log(
        "-------------------------------------------------------------"
      );
      console.log(`5. Buscar información de producto con ID: ${id} (GET)`);
      console.log(data);
      return data;
    })
    .catch((error) =>
      console.error(
        `Error al buscar el producto con ID ${id}`,
        error.message
      )
    );
};

await buscarProductoPorId(1);

const eliminarProducto = async (id) => {
  return fetch(`${urlApi}/products/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      console.log(
        "-------------------------------------------------------------"
      );
      console.log(`6. Eliminar producto con ID: ${id} (DELETE)`);
      console.log("Producto eliminado exitosamente:");
      console.log(data);
      return data;
    })
    .catch((error) =>
      console.error(
        `Error al eliminar el producto con ID ${id}`,
        error.message
      )
    );
};

await eliminarProducto(1);

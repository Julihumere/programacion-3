import { readFileSync, writeFileSync } from "fs";
const urlApi = "https://fakestoreapi.com";

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

const modificarProducto = async (id, productoActualizado) => {
  return fetch(`${urlApi}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productoActualizado),
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
      console.log(`7. Modificar producto con ID: ${id} (PUT)`);
      console.log("Producto modificado exitosamente:");
      console.log(data);
      return data;
    })
    .catch((error) =>
      console.error(
        `Error al modificar el producto con ID ${id}`,
        error.message
      )
    );
};

await modificarProducto(1, {
  name: "Producto actualizado",
  price: 250,
  description: "Nueva descripcion",
});

const agregarProductoAlArchivo = (nuevoProducto) => {
  try {
    const data = readFileSync("Productos.json", "utf-8");
    const productos = JSON.parse(data);

    productos.push(nuevoProducto);

    writeFileSync("Productos.json", JSON.stringify(productos, null, 2));

    console.log("-------------------------------------------------------------");
    console.log("Producto agregado:");
    console.log(nuevoProducto);
  } catch (error) {
    console.error("Error al agregar producto al archivo local:", error.message);
  }
};

const productoLocal = {
  id: 999,
  title: "Prueba titulo",
  price: 85000,
  description: "Esta es una descripcion",
  category: "Prueba",
};

agregarProductoAlArchivo(productoLocal);

const eliminarProductosCarosSuperiores = (precioMax) => {
  try {
    const data = readFileSync("Productos.json", "utf-8");
    const productos = JSON.parse(data);

    const filtrados = productos.filter((p) => Number(p.price) <= Number(precioMax));

    writeFileSync("Productos.json", JSON.stringify(filtrados, null, 2));

    console.log("-------------------------------------------------------------");
    console.log(`Productos con precio mayor a ${precioMax} eliminados.`);
    console.log("Archivo actualizado.");
  } catch (error) {
    console.error("Error al procesar Productos.json:", error.message);
  }
};

// Ejemplo: eliminar productos con precio > 100 Quitar el comentario para utilizar
//eliminarProductosCarosSuperiores(100);


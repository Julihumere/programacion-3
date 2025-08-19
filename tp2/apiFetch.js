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

import fs from "fs";
import crypto from "crypto";

class ProductManager {
  static #products = [];

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      ProductManager.#products = JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
  }

  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"), // Generate a random id for each new product
          title: data.title,
          photo: data.photo,
          price: `${data.price}€`,
          stock: data.stock,
        };
        ProductManager.#products.push(newProduct);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Product created successfully: " + newProduct.id);
        return newProduct;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("Not found!");
      } else {
        //console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readOne(id) {
    try {
      const oneProduct = ProductManager.#products.find(
        (each) => each.id === id
      );
      if (oneProduct) {
        console.log(oneProduct);
        return oneProduct;
      } else {
        throw new Error("Not found!");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async update(id, data) {
    try {
      const productIndex = ProductManager.#products.findIndex(
        (each) => each.id === id
      );
      if (productIndex !== -1) {
        const updatedProduct = {
          ...ProductManager.#products[productIndex],
          ...data,
        };
        ProductManager.#products[productIndex] = updatedProduct;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Product updated successfully: " + updatedProduct.id);
        return updatedProduct;
      } else {
        throw new Error("Product not found!");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const oneProduct = ProductManager.#products.find(
        (each) => each.id === id
      );
      if (oneProduct) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("Product deleted successfully: " + id);

        return id;
      } else {
        throw new Error("There is no product to delete");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const newProduct = new ProductManager("./src/data/fs/files/products.json");

/*
// Create two new products
const product1 = newProduct.create({
  title: "Producto 1",
  photo: "/ruta/a/la/imagen.jpg",
  price: `100`,
  stock: 10,
});
const product2 = newProduct.create({
  title: "Producto 2",
  photo: "/ruta/a/la/imagen1.jpg",
  price: `200`,
  stock: 25,
});

// Print the products array
newProduct.read();

// Print one product by id
newProduct.readOne();

// Delete one product by id
newProduct.destroy();
*/

// Export the instance of the class ProductManager
export default newProduct;

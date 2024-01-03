// Import the file system module
import fs from "fs";
// Import the crypto module
import crypto from "crypto";

// Class definition: ProductManager
class ProductManager {
  // Static array defined as private to store the products
  // (This array will store momentarily save all the products from the file to make it easier to work with them)
  static #products = [];

  // Method to initialize the JSON file
  // (Validate if the JSON file exists)
  init() {
    // Check if the JSON file exists
    const exists = fs.existsSync(this.path);
    //console.log(exists);
    if (!exists) {
      // If the JSON file doesn't exist, we will create it
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      // If the JSON file exists, read it
      ProductManager.#products = JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
  }

  // Constructor of the class
  constructor(path) {
    // Set the path for the JSON file
    this.path = path;
    // Initialize the JSON file
    this.init();
  }

  // Method to create a new product
  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price and stock are required");
      } else {
        // Create a new product object
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"), // Generate a random id for each new product
          title: data.title,
          photo: data.photo,
          price: `${data.price}€`,
          stock: data.stock,
        };
        // Pushing the new product into the array of products
        ProductManager.#products.push(newProduct);
        // Write the data to the JSON file
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        // Print in the console the id of the new product
        console.log("Product created successfully: " + newProduct.id);
        // Return the new product
        return newProduct;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to read all the products
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("Not found!");
      } else {
        // Print the array of products in the console
        console.log(ProductManager.#products);
        // Return the array of products
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to read one product by id
  readOne(id) {
    try {
      // Return the product with the id passed as parameter
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

  async destroy(id) {
    try {
      // Return the product with the id passed as parameter
      const oneProduct = ProductManager.#products.find(
        (each) => each.id === id
      );
      if (oneProduct) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        // Write the data into the JSON file
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        // Print in the console the id of the new product
        console.log("Product deleted successfully: " + id);
        // Return the new product
        return id;
      } else {
        throw new Error("There is no product to delete with ID: " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

// Create a new instance of the class ProductManager
const newProduct = new ProductManager("./fs/files/products.json");

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

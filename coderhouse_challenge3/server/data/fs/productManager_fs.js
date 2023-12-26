//const fs = require("fs");
import fs from "fs";

// Class definition: ProductManager
class ProductManager {
    // Static array defined as private to store the products
    static #products = [];
    // Static counter defined as private for the products id
    static #idCounter = 0;

    // Method to initialize the JSON file
    init() {
        // Check if the JSON file exists
        const exists = fs.existsSync(this.path);
        console.log(exists);
        if (!exists) {
            // If the JSON file doesn't exist, create it
            const data = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, data);
        } else {
            // If the JSON file exists, read it
            const all = JSON.parse(fs.readFileSync(this.path, 'utf8'));
            console.log(all);
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
    create(data) {
        // Create a new product object
        const newProduct = {
            id: ProductManager.#idCounter++, // Increment the id counter for each new product
            title: data.title,
            photo: data.photo,
            price: `${data.price}€`,
            stock: data.stock
        };
        // Pushing the new product into the array of products
        ProductManager.#products.push(newProduct);
        // Defining the path and data for the JSON file
        const jsonData = JSON.stringify(ProductManager.#products, null, 2);
        // Write the data to the JSON file
        fs.writeFileSync(this.path, jsonData);
        // Return the new product
        return newProduct;
    }

    // Method to read all the products
    read() {
        // Read the products from the JSON file
        const jsonData = fs.readFileSync(this.path, 'utf8');
        // Convert the JSON string into an array of products
        ProductManager.#products = jsonData ? JSON.parse(jsonData) : [];
        // Return the array of products
        return ProductManager.#products;
    }

    // Method to read one product by id
    readOne(id) {
        // Update the array of products with the data from the JSON file
        this.read();
        // Return the product with the id passed as parameter
        return ProductManager.#products.find(each => each.id === Number(id));
    }
}

// Create a new instance of the class ProductManager
const newProduct = new ProductManager("./fs/files/products.json");

// Create two new products
//const product1 = newProduct.create({title: 'Producto 1', photo: '/ruta/a/la/imagen.jpg', price: `100`, stock: 10});
//const product2 = newProduct.create({title: 'Producto 2', photo: '/ruta/a/la/imagen1.jpg', price: `200`, stock: 25});

// Print the products array
// console.log(newProduct.read());

// Print one product by id
// console.log(newProduct.readOne(1));

// Export the instance of the class ProductManager
export default newProduct;

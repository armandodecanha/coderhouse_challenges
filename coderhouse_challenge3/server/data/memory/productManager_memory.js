// Class definition: ProductManager
class ProductManager {
  // Static array defined as private to store the products
  static #products = [];
  // Static counter defined as private for the products id
  static #idCounter = 0;

  // Constructor of the class
  constructor() {}

  // Method to create a new product
  create(data) {
    // Create a new product object
    const newProduct = {
      id: ProductManager.#idCounter++,
      title: data.title,
      photo: data.photo,
      price: `${data.price}€`,
      stock: data.stock,
    };
    // Push the new product into the array of products
    ProductManager.#products.push(newProduct);
    // Return the new product
    return newProduct;
  }

  // Method to read all the products
  read() {
    // Return the array of products
    return ProductManager.#products;
  }

  // Method to read one product by id
  readOne(id) {
    // Return the product with the id passed as parameter
    return ProductManager.#products.find((each) => each.id === Number(id));
  }

  destroy(id) {
    try {
      const oneUser = ProductManager.#products.find((each) => each.id === id);
      if (oneUser) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        console.log("Product deleted successfully: " + id);
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
const newProduct = new ProductManager();

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
console.log(newProduct.read());

// Print one product by id
console.log(newProduct.readOne(0));

// Delete one product by id
console.log(newProduct.destroy(0));
// Import the crypto module
import crypto from "crypto";

// Class definition: OrderManager
class OrderManager {
  // Static array defined as private to store the orders
  static #orders = [];

  // Constructor of the class
  constructor() {}

  // Method to create a new order
  create(data) {
    // Create a new order object
    const newOrder = {
      id: crypto.randomBytes(12).toString("hex"), // Generate a random id for each new order
      productTitle: data.productTitle,
      quantity: data.quantity,
      total: `${data.total}€`,
    };
    // Push the new order into the array of orders
    OrderManager.#orders.push(newOrder);
    // Return the new order
    return newOrder;
  }

  // Method to read all the orders
  read() {
    // Return the array of orders
    return OrderManager.#orders;
  }

  // Method to read one order by id
  readOne(id) {
    // Return the order with the id passed as parameter
    return OrderManager.#orders.find((each) => each.id === id);
  }

  destroy(id) {
    try {
      const oneOrder = OrderManager.#orders.find((each) => each.id === id);
      if (oneOrder) {
        OrderManager.#orders = OrderManager.#orders.filter(
          (each) => each.id !== id
        );
        console.log("Order deleted successfully: " + id);
        return id;
      } else {
        throw new Error("There is no order to delete with ID: " + id);
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

// Create a new instance of the class OrderManager
const newOrder = new OrderManager();

/*
// Create two new orders
const order1 = newOrder.create({
  productTitle: "Producto 1",
  quantity: 2,
  total: `200`,
});
const order2 = newOrder.create({
  productTitle: "Producto 2",
  quantity: 1,
  total: `200`,
});

// Print the orders array
console.log(newOrder.read());

// Print one order by id
console.log(newOrder.readOne(order1.id));

// Delete one order by id
console.log(newOrder.destroy(order2.id));
*/

// Export the instance of the class OrderManager
export default newOrder;
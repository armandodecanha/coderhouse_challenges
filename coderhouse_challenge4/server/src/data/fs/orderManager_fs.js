// Import the file system module
import fs from "fs";
// Import the crypto module
import crypto from "crypto";

// Class definition: OrderManager
class OrderManager {
  // Static array defined as private to store the orders
  static #orders = [];

  // Method to initialize the JSON file
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      OrderManager.#orders = JSON.parse(fs.readFileSync(this.path, "utf8"));
    }
  }

  // Constructor of the class
  constructor(path) {
    this.path = path;
    this.init();
  }

  // Method to create a new order
  async create(data) {
    try {
      if (!data.pid || !data.uid || !data.quantity || !data.state) {
        throw new Error("pid, uid, quantity and state are required");
      } else {
        const newOrder = {
          id: crypto.randomBytes(12).toString("hex"),
          pid: data.pid,
          uid: data.uid,
          quantity: data.quantity,
          state: data.state,
        };
        OrderManager.#orders.push(newOrder);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrderManager.#orders, null, 2)
        );
        console.log("Order created successfully: " + newOrder.id);
        return newOrder;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to read all the orders
  read() {
    try {
      if (OrderManager.#orders.length === 0) {
        throw new Error("Not found!");
      } else {
        console.log(OrderManager.#orders);
        return OrderManager.#orders;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to read one order by id
  readOne(id) {
    try {
      const oneOrder = OrderManager.#orders.find((each) => each.id === id);
      if (oneOrder) {
        console.log(oneOrder);
        return oneOrder;
      } else {
        throw new Error("Not found!");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // Method to update an order by id
  async update(id, data) {
    try {
      // Find the order with the id passed as parameter
      const orderIndex = OrderManager.#orders.findIndex(
        (each) => each.id === id
      );
      if (orderIndex !== -1) {
        // Update the order data
        const updatedOrder = {
          ...OrderManager.#orders[orderIndex],
          ...data,
        };
        // Replace the order in the array
        OrderManager.#orders[orderIndex] = updatedOrder;
        // Write the data into the JSON file
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrderManager.#orders, null, 2)
        );
        // Print in the console the id of the updated order
        console.log("Order updated successfully: " + updatedOrder.id);
        // Return the updated order
        return updatedOrder;
      } else {
        throw new Error("Order not found!");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const oneOrder = OrderManager.#orders.find((each) => each.id === id);
      if (oneOrder) {
        OrderManager.#orders = OrderManager.#orders.filter(
          (each) => each.id !== id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(OrderManager.#orders, null, 2)
        );
        console.log("Order deleted successfully: " + id);
        return id;
      } else {
        throw new Error("There is no order to delete");
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

// Create a new instance of the class OrderManager
const newOrder = new OrderManager("./src/data/fs/files/orders.json");

// Export the instance of the class OrderManager
export default newOrder;

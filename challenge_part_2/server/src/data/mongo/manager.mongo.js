import Products from "./models/products.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      const all = await this.model.find();
      if (all.length === 0) {
        const error = new Error("No data found");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      if (!one) {
        const error = new Error("Data not found");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {}
  async destroy(id) {
    try {
        const one = await this.model.findByIdAndDelete(id);
        if (!one) {
            const error = new Error("Data not found");
            error.statusCode = 404;
            throw error;
        }
        return one;
    } catch (error) {
        throw error;
    }
  }
}

const newProduct = new MongoManager(Products);
// Add the other managers
export default newProduct;

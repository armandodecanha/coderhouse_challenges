import { Router } from "express";
import newProduct from "../../data/fs/productManager_fs.js";

const productsRouter = Router();

// Defining the endpoints for /api/products

// POST /api/products
productsRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
    const response = await newProduct.create(data);
    if (response === "Title, photo, price and stock are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "Product created successfully",
        response,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// GET /api/products
productsRouter.get('/', (req, res) => {
  try {
    const all = newProduct.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// GET /api/products/:pid
productsRouter.get('/:pid', (req, res) => {
  try {
    const { pid } = req.params;
    const one = newProduct.readOne(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// PUT /api/products/:pid
productsRouter.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await newProduct.update(pid, data);
    if (response === "There is no product to update") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        message: "Product updated successfully",
        response,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// DELETE /api/products/:pid
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await newProduct.destroy(pid);
    if (response === "There is no product to delete") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

export default productsRouter;
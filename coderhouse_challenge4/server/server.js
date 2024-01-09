import express, { response } from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";

const server = express();

const PORT = 8080;
const ready = console.log(`Server ready. Listening on port ${PORT}`);

// Middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/", router);

server.listen(PORT, ready);

/*
// Endpoints
// GET /api/products
server.get("/api/products", (req, res) => {
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

server.get("/api/products/:pid", (req, res) => {
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

// POST /api/products
server.post("/api/products", async (req, res) => {
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

// DELETE /api/products/:pid
server.delete("/api/products/:pid", async (req, res) => {
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

// GET /api/users
server.get("/api/users", (req, res) => {
  try {
    const all = newUser.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req, res) => {
  try {
    const { uid } = req.params;
    const one = newUser.readOne(uid);
    console.log(one);
    if (typeof one === "string") {
      return res.status(404).json({
        success: false,
        message: one,
      });
    } else {
      return res.status(200).json({
        success: true,
        response: one,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
*/
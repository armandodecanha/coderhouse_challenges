import { Router } from "express";
import newProduct from "../../data/fs/productManager_fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await newProduct.read();
    return res.render("products", { products: all });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import newProduct from "../../data/fs/productManager_fs.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await newProduct.read(); // Obtiene los productos
    return res.render("home", { products: all }); // Pasa los productos a la vista
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;

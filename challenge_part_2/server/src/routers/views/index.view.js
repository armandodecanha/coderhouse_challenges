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

viewsRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/form", (req, res, next) => { // Nuevo endpoint para "/form"
  try {
    return res.render("form"); // Renderiza la vista "form"
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/", usersRouter);

export default viewsRouter;
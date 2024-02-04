import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const mainUsers = ["HP", "Titanic", "Matrix", "Star Wars", "Indiana Jones"];
    return res.render("home", { events: mainUsers });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;

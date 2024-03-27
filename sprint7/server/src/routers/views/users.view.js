import { Router } from "express";
import newUser from "../../data/fs/userManager_fs.js";

const usersRouter = Router();

usersRouter.get("/auth/register", (req, res, next) => {
  try {
    const one = newUser.readOne("7fe97eb34cf7b84db9755917");
    return res.render("register", { user: one });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/auth/login", (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
import { Router } from "express";
//import newUser from "../../data/fs/userManager_fs.js";

const usersRouter = Router();

usersRouter.get("/profile", async (req, res, next) => {
  try {
    //const one = newUser.readOne("1c93088e27c59bdb87924165");
    //return res.render("profile");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
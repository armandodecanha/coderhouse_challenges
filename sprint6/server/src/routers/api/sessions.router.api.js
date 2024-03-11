import { Router } from "express";
import users from "../../data/mongo/models/user.model.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post("/register",  /*has8char,*/ async (req, res, next) => {
  try {
    const data = req.body;
    await users.create(data);
    return res.json({
      statusCode: 201,
      message: "Registered!",
    });
  } catch (error) {
    return next(error);
  }
});

// Login
sessionsRouter.post("/login", /*isValidPass,*/ async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "admin";
      return res.json({
        statusCode: 200,
        message: "Logged in successfully",
        session: req.session,
      });
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

// Me
sessionsRouter.post("/me", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

// Logout
sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Logged out successfully",
      });
    } else {
      const error = new Error("No session to logout");
      error.statusCode = 409;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;

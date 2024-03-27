import { Router } from "express";
import users from "../../data/mongo/models/user.model.js";
import has8char from "../../middlewares/has8char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
//import passport from "passport";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post(
  "/register",
  /*has8char,*/
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 401,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        token: req.token, // Devuelvo en el objeto req la propiedad token que contiene el token
      });
    } catch (error) {
      return next(error);
    }
  }
);

/* con cookies
//login
sessionsRouter.post(
  "/login",
  passCallBack("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
    } catch (error) {
      return next(error);
    }
  }
);
*/
/*
//login
sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);
*/

/*
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
*/

//badauth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});


export default sessionsRouter;

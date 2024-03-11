import "dotenv/config.js"

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import products from "./src/data/fs/productManager_fs.js";
import dbConnection from "./src/utils/dbConnection.utils.js";
import expressSession from "express-session";
//import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
}
//server.listen(PORT, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", (socket) => {
  console.log("Socket connected.");
  socket.emit("products", products.read());
  socket.on("newProduct", async (data) => {
    try {
        await products.create(data);
    } catch (error) {
        console.log(error);
    }
  });
});

// templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
//MEMORY STORAGE
/*
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
*/

//FILE STORAGE
/*
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10,
      retries: 2,
    }),
  })
);
*/

//MONGO STORAGE
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.DB_URI,
    }),
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

// routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

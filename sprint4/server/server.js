import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import products from "./src/data/fs/productManager_fs.js";

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

const server = express();
const PORT = 8080;
const ready = () => console.log(`Server ready. Listening on port ${PORT}`);
//server.listen(PORT, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", (socket) => {
  console.log(socket.id);
  //socket.emit("welcome", "Welcome");
  socket.emit("products", products.read());
  socket.on("newProduct", async (data) => {
    try {
        //console.log(data);
        await products.create(data);
        //socket.emit("products", products.read());
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
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

// routers
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

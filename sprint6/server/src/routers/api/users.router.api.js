import { Router } from "express";
//import newUser from "./src/data/fs/userManager_fs.js";
import newUser from "../../data/mongo/manager.mongo.js";

const usersRouter = Router();

// Defining the endpoints for /api/users
usersRouter.post('/', (req, res) => {});
usersRouter.get('/', (req, res) => {});
usersRouter.get('/:uid', (req, res) => {});
usersRouter.put('/:uid', (req, res) => {});
usersRouter.delete('/:uid', (req, res) => {});

export default usersRouter;
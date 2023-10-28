import express from "express";
import db from './db.mjs';
const userRouter = express.Router();
import UserController from "../controllers/userController.mjs";

const uController = new UserController(db)

userRouter.post("/login", uController.loguinUser.bind(uController));

userRouter.post("/logout", uController.logout.bind(uController));

userRouter.get("/login", uController.verifyLoguin.bind(uController));

export default userRouter;
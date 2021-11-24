import express, { Router } from "express";
import userController from "../controllers/userController";

const v1: Router = express.Router();

v1.post("/auth", userController.auth);

v1.use(
  "/users",
  express
    .Router()
    .get("/", userController.getUsers)
    .get("/:userId", userController.getUser)
    .post("/create", userController.createUser)
    .put("/edit/:userId", userController.editUser)
    .delete("/delete/:userId", userController.deleteUser)
);

export { v1 };

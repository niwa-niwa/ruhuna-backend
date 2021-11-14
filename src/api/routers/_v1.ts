import express, { Router } from "express";
import user from "../controllers/userController";

const v1: Router = express.Router();

v1.post("/auth", user.auth);
v1.get("/users", user.getUsers);
v1.get("/users/:userId", user.getUser);
v1.post("/users/create", user.createUser);
v1.put("/users/edit/:userId", user.editUser);
v1.delete("/users/delete/:userId", user.deleteUser);

export { v1 };

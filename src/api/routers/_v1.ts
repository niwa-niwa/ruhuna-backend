import express, { Router } from "express";
import user from "../controllers/userController";

const v1: Router = express.Router();

v1.post("/auth", user.auth);
v1.get("/users", user.getUsers);
v1.post("/user", user.getUser);
v1.post("/user/create", user.createUser);
v1.put("/user/edit", user.editUser);
v1.delete("/user/delete", user.deleteUser);

export { v1 };

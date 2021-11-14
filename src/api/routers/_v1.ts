import express, { Router } from "express";
import user from "../controllers/userController";

const v1: Router = express.Router();

v1.get("/", user.index);
v1.post("/auth", user.auth);

export { v1 };

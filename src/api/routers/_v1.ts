import express, { Router } from "express";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import villageController from "../controllers/villageController";
import { validateToken } from "../middlewares/validateToken";

const v1: Router = express.Router();

v1.use("/auth", validateToken, express.Router().get("/", authController.auth));

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

v1.use(
  "/villages",
  validateToken,
  express
    .Router()
    .get("/", villageController.getVillages)
    .get("/:villageId", villageController.getVillageDetail)
    .post("/create", villageController.createVillage)
    .put("/edit/:villageId", villageController.editVillage)
    .delete("/delete/:villageId", villageController.deleteVillage)
);

export { v1 };

import express, { Router } from "express";
import user from "../controllers/userController";

const router: Router = express.Router();

router.get("/", user.index);
router.post("/auth", user.auth);

export default router;

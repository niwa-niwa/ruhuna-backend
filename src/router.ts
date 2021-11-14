import express, { Router } from "express";
import { apiRouter } from "./api/routers";

const router: Router = express.Router();

router.use("/api", apiRouter);

export { router };

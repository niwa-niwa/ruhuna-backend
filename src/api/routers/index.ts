import express, { Router } from "express";
import { v1 } from "./_v1";

const apiRouter: Router = express.Router();

apiRouter.use("/v1", v1);

export { apiRouter };

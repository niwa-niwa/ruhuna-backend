import express, { Express } from "express";
import { router } from "./router";

const app: Express = express();

app.use(router);

export default app;

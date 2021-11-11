import "dotenv/config";
import express, { Express } from "express";
import api from "./api";

const app: Express = express();

app.use("/api", api);

const PORT: string = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(`Start the Web Server at: http://localhost:${PORT}`);
});

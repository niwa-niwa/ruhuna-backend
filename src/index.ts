// read .env
require("dotenv").config();

import express, { Request, Response, Express } from "express";
import { FirebaseAdmin } from "./lib/FirebaseAdmin";

const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("The Express with Node.js right now");
});

app.post("/auth", async (req: Request, res: Response) => {
  const idToken: string | undefined = req.header("Authorization");

  if (idToken) {
    const currentUser: object = await FirebaseAdmin.auth().verifyIdToken(
      idToken.replace("Bearer ", "")
    );
    res.json({ currentUser });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("auth api working!");
  }
});

const PORT: string = process.env.PORT || "3001";

app.listen(PORT, () => {
  console.log(`Start the Web Server at: http://localhost:${PORT}`);
});

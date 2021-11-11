import { Request, Response } from "express";
import { FirebaseAdmin } from "../lib/FirebaseAdmin";

export const index = async (req: Request, res: Response) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("api version 1+ : The Express with Node.js right now");
};

export const auth = async (req: Request, res: Response) => {
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
};

export default { index, auth };

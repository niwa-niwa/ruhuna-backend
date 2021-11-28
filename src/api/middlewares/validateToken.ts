import { CustomRequest } from "./../../types/CustomRequest";
import { Response, NextFunction } from "express";
import { prismaClient } from "../../lib/Prisma";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { User } from "@prisma/client";
import { ErrorObj } from "../../types/ErrorObj";
import { generateErrorObj } from "../../lib/generateErrorObj";
import { verifyToken } from "../../lib/FirebaseAdmin";

export const validateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const idToken: string | undefined = req.header("Authorization");

  if (!idToken) {
    res.status(400).json({ message: "Headers has not token" });
    return;
  }

  const firebaseUser: DecodedIdToken | ErrorObj = await verifyToken(
    idToken.replace("Bearer ", "")
  );

  if ("errorObj" in firebaseUser) {
    res.status(firebaseUser.errorObj.errorCode).json(firebaseUser);
    return;
  }

  const currentUser: User | null = await prismaClient.user.findUnique({
    where: { firebaseId: firebaseUser.uid },
  });

  if (!currentUser) {
    res
      .status(404)
      .json(generateErrorObj(404, "The user by token is not found"));
    return;
  }

  req.currentUser = currentUser;

  return next();
};

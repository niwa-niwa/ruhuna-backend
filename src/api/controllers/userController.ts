import { Request, Response } from "express";
import { FirebaseAdmin } from "../../lib/FirebaseAdmin";
import { PrismaClient } from ".prisma/client";

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

// todo : implement what get a User by id
export const getUser = async (req: Request, res: Response) => {
  const id: string = "1";
  const prisma: PrismaClient = new PrismaClient();
  const user: object | null = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    res.status(404).json({ message: "該当ユーザーはいまん" });
  }

  res.status(202).json({ user });
};

export const getUsers = async (req: Request, res: Response) => {
  const prisma: PrismaClient = new PrismaClient();
  const allUsers = await prisma.user.findMany();
  res.status(200).json({ users: allUsers });
};

export const createUser = async (req: Request, res: Response) => {
  // todo : implement what create a user
  // todo : response a token that firebase auth generated
  res.status(200).json({ message: "create a user" });
};

export const editUser = async (req: Request, res: Response) => {
  // todo :implement what edit a user by user id
  res.status(200).json({ message: "edit a user" });
};

export const deleteUser = async (req: Request, res: Response) => {
  // todo : implement what delete a user by user id
  res.status(200).json({ message: "delete a user" });
};

export default {
  auth,
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
};

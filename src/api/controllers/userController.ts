import { Request, Response } from "express";
import { verifyToken } from "../../lib/FirebaseAdmin";
import { Prisma, PrismaClient, User } from ".prisma/client";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { ErrorObj } from "types/error";

// TODO delete the function after implemented test cases for users
export const test = async (req: Request, res: Response) => {
  res.status(200).json("auth api working!");
};

export const auth = async (req: Request, res: Response) => {
  const idToken: string | undefined = req.header("Authorization");

  if (!idToken) {
    res.status(400).json({ message: "Headers has not token" });
    return;
  }

  const currentUser: DecodedIdToken | ErrorObj = await verifyToken(
    idToken.replace("Bearer ", "")
  );

  if ("error" in currentUser) {
    res.status(currentUser.status).json(currentUser);
    return;
  }

  res.json({ currentUser });
};

export const getUser = async (req: Request, res: Response) => {
  const id: string = req.params.userId;

  const prisma: PrismaClient = new PrismaClient();
  const user: User | null = await prisma.user.findUnique({ where: { id } });

  if (user) {
    res.status(202).json({ user });
  } else {
    res.status(404).json({ message: "該当ユーザーはいません" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const prisma: PrismaClient = new PrismaClient();
  const users: User[] = await prisma.user.findMany();
  res.status(200).json({ users: users });
};

export const createUser = async (req: Request, res: Response) => {
  const firebaseToken: string = req.body.firebaseToken;

  try {
    const currentUser: DecodedIdToken | ErrorObj = await verifyToken(
      firebaseToken
    );

    if ("error" in currentUser) {
      res.status(currentUser.status).json(currentUser);
      return;
    }

    if ("uid" in currentUser) {
      const data: Prisma.UserCreateInput = {
        firebaseId: currentUser.uid,
        username: currentUser.name,
      };

      const prisma: PrismaClient = new PrismaClient();
      const createdUser: User = await prisma.user.create({ data });

      res.status(200).json({ user: createdUser });
    }
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "ユーザー作成に失敗しました" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const id: string = req.params.userId;
  const data: Prisma.UserUpdateInput = req.body;

  const prisma: PrismaClient = new PrismaClient();
  const editedUser: User = await prisma.user.update({
    where: { id },
    data,
  });

  if (editedUser) {
    res.status(200).json({ user: editedUser });
  } else {
    res.status(404).json({ message: "該当ユーザーはいません" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params.userId;

  const prisma: PrismaClient = new PrismaClient();
  const deletedUser: User = await prisma.user.delete({
    where: { id },
  });

  if (deletedUser) {
    res.status(200).json({ user: deletedUser });
  } else {
    res.status(404).json({ message: "該当ユーザーはいません" });
  }
};

export default {
  test, // TODO delete the function after implemented test cases for users
  auth,
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
};

import { Request, Response } from "express";
import { verifyToken } from "../../lib/FirebaseAdmin";
import { Prisma, User } from "@prisma/client";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { prismaClient } from "../../lib/Prisma";
import { generateErrorObj } from "../../lib/generateErrorObj";
import { ErrorObj } from "types/ErrorObj";

export const getUser = async (req: Request, res: Response) => {
  const id: string = req.params.userId;

  const user: User | null = await prismaClient.user.findUnique({
    where: { id },
  });

  if (user) {
    res.status(200).json({ user });
  } else {
    res
      .status(404)
      .json({ user: generateErrorObj(404, "The User is not Found") });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await prismaClient.user.findMany();
  res.status(200).json({ users: users });
};

export const createUser = async (req: Request, res: Response) => {
  const firebaseToken: string = req.body.firebaseToken;

  try {
    const currentUser: DecodedIdToken | ErrorObj = await verifyToken(
      firebaseToken
    );

    if ("errorObj" in currentUser) {
      res.status(currentUser.errorObj.errorCode).json({ user: currentUser });
      return;
    }

    if ("uid" in currentUser) {
      const data: Prisma.UserCreateInput = {
        firebaseId: currentUser.uid,
        username: currentUser.name,
      };

      const createdUser: User = await prismaClient.user.create({ data });

      res.status(200).json({ user: createdUser });
    }
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "ユーザー作成に失敗しました" });
  } finally {
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.userId;
    const data: Prisma.UserUpdateInput = req.body;

    const editedUser: User = await prismaClient.user.update({
      where: { id },
      data,
    });

    res.status(200).json({ user: editedUser });
  } catch (e) {
    console.error(e);
    res
      .status(404)
      .json({ user: generateErrorObj(404, "The User is not Found") });
  } finally {
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.userId;

    const deletedUser: User = await prismaClient.user.delete({
      where: { id },
    });

    res.status(200).json({ user: deletedUser });
  } catch (e) {
    console.error(e);
    res
      .status(404)
      .json({ user: generateErrorObj(404, "the user is not found") });
  } finally {
  }
};

export default {
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
};

import { Request, Response } from "express";
import { Prisma, Village, User } from "@prisma/client";
import { prismaClient } from "../../lib/Prisma";
import { CustomRequest } from "../../types/CustomRequest";

export const createVillage = async (req: CustomRequest, res: Response) => {
  const userId = req.currentUser?.id || "";
  const { name, description }: Prisma.VillageCreateWithoutUsersInput = req.body;

  const aaa: User | null = await prismaClient.user.findUnique({
    where: { id: userId },
  });

  // TODO implement adding user in village fields
  const currentUser: User | null = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      villages: {
        create: [
          {
            village: {
              create: {
                name,
                description,
              },
            },
          },
        ],
      },
    },
    include: {
      villages: { include: { village: true } },
    },
  });

  res.status(200).json({ user: currentUser });
};

export default { createVillage };

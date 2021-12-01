import { Response } from "express";
import { Prisma, Village } from "@prisma/client";
import { prismaClient } from "../../lib/Prisma";
import { CustomRequest } from "../../types/CustomRequest";

export const createVillage = async (req: CustomRequest, res: Response) => {
  const userId = req.currentUser?.id || "";

  const { name, description }: Prisma.VillageCreateWithoutUsersInput = req.body;

  const createdVillage: Village = await prismaClient.village.create({
    data: {
      name,
      description,
      users: { connect: { id: userId } },
    },
    include: {
      users: true,
    },
  });

  res.status(200).json({ village: createdVillage });
};

export default { createVillage };

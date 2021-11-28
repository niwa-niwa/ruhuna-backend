import { Request, Response } from "express";
import { Prisma, Village } from "@prisma/client";
import { prismaClient } from "../../lib/Prisma";
import { CustomRequest } from "../../types/CustomRequest";

export const createVillage = async (req: CustomRequest, res: Response) => {
  const userId = req.currentUser?.id || "";
  const { name, description } = req.body;

  // TODO implement adding user in village fields
  const createdVillage: Village = await prismaClient.village.create({
    data: {
      name,
      description,
    },
  });
  await prismaClient.$disconnect();

  res.status(200).json({ village: createdVillage });
};

export default { createVillage };

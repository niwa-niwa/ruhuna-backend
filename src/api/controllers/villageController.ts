import { villages } from "./../../../prisma/seeds/users";
import { Response } from "express";
import { Prisma, Village } from "@prisma/client";
import { prismaClient } from "../../lib/Prisma";
import { CustomRequest } from "../../types/CustomRequest";

export const getVillages = async (req: CustomRequest, res: Response) => {
  const villages: Village[] = await prismaClient.village.findMany({
    include: { users: true, messages: true },
  });

  res.status(200).json({ villages });
};

export const getVillageDetail = async (req: CustomRequest, res: Response) => {
  const id: string = req.params.villageId;

  const village: Village | null = await prismaClient.village.findUnique({
    where: { id },
    include: { users: true, messages: true },
  });

  res.status(200).json({ village });
};

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
      messages: true,
    },
  });

  res.status(200).json({ village: createdVillage });
};

export const editVillage = async (req: CustomRequest, res: Response) => {
  const id: string = req.params.villageId;
  const data: Prisma.VillageUpdateInput = req.body;

  const village: Village = await prismaClient.village.update({
    where: { id },
    data: data,
    include: { users: true, messages: true },
  });

  res.status(200).json({ village });
};

export const deleteVillage = async (req: CustomRequest, res: Response) => {
  const id: string = req.params.villageId;

  const village: Village = await prismaClient.village.delete({ where: { id } });

  res.status(200).json({ village });
};
export default {
  getVillages,
  getVillageDetail,
  createVillage,
  editVillage,
  deleteVillage,
};

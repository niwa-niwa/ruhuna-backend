import { prismaClient } from "../../src/lib/Prisma";
import { firebase_user, auth_user } from "./testData";
import { generateErrorObj } from "../../src/lib/generateErrorObj";
import { users } from "../../Prisma/seeds/users";
import { tokens } from "./testData";

beforeEach(async () => {
  await prismaClient.user.createMany({ data: users });
  await prismaClient.$disconnect();
});

afterEach(async () => {
  const deleteUsers = prismaClient.user.deleteMany();
  const deleteVillages = prismaClient.village.deleteMany();
  // const deleteUsersOnVillages = prismaClient.usersOnVillages.deleteMany();
  const deleteMessage = prismaClient.message.deleteMany();
  await prismaClient.$transaction([
    deleteUsers,
    deleteVillages,
    // deleteUsersOnVillages,
    deleteMessage,
  ]);
  await prismaClient.$disconnect();
});

jest.mock("../../src/lib/FirebaseAdmin", () => ({
  verifyToken: (token: string) => {
    if (token == tokens.auth_user) {
      return auth_user;
    }
    if (token === tokens.firebase_user) {
      return firebase_user;
    }
    return generateErrorObj(400, "ID token has invalid signature");
  },
}));

jest.spyOn(console, "error").mockImplementation(() => {});

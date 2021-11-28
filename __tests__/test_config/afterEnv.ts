import { prismaClient } from "../../src/lib/Prisma";
import { firebase_user, auth_user } from "./testData";
import { generateErrorObj } from "../../src/lib/generateErrorObj";
import { users } from "../../Prisma/seeds/users";
import { tokens } from "./testData";

beforeEach(async () => {
  try {
    await prismaClient.user.createMany({ data: users });
  } catch (e) {
    /**
     * This bight be jest bug.
     * users are deleted after each test but it couldn't insert the users
     */
  } finally {
    await prismaClient.$disconnect();
  }
});

afterEach(async () => {
  const deleteUsers = prismaClient.user.deleteMany();
  const deleteVillages = prismaClient.village.deleteMany();
  await prismaClient.$transaction([deleteUsers, deleteVillages]);
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

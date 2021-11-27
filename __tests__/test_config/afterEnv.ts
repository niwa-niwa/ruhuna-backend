import { prismaClient } from "../../src/lib/Prisma";
import { firebase_user } from "./testData";
import { generateErrorObj } from "../../src/lib/generateErrorObj";
import { users } from "../../Prisma/seeds/users";

beforeEach(async () => {
  try {
    await prismaClient.user.createMany({ data: users });
  } catch (e) {
    /**
     * This bight be jest bug.
     * users are deleted after each test but it couldn't insert the users
     */
  }
});

afterEach(async () => {
  const deleteUsers = prismaClient.user.deleteMany();
  await prismaClient.$transaction([deleteUsers]);
});

jest.mock("../../src/lib/FirebaseAdmin", () => ({
  verifyToken: (token: string) => {
    if (!token) {
      return generateErrorObj(400, "ID token has invalid signature");
    }
    return firebase_user;
  },
}));

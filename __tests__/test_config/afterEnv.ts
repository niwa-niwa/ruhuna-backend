import { prismaClient } from "../../src/lib/Prisma";
import { firebase_user, auth_user } from "./testData";
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
    if (token == "token_auth_user") {
      return auth_user;
    }
    if (token === "token_firebase_user") {
      return firebase_user;
    }
    return generateErrorObj(400, "ID token has invalid signature");
  },
}));

jest.spyOn(console, "error").mockImplementation(() => {});

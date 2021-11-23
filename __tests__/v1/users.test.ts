import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../../src/app";
import { firebase_user } from "../data/testData";
import { users } from "../../Prisma/seeds/users";

const prisma = new PrismaClient();
const PREFIX_USERS = "/api/v1/users";

beforeAll(async () => {
  await prisma.user.createMany({ data: users });
});

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteUsers]);

  await prisma.$disconnect();
});

jest.mock("../../src/lib/FirebaseAdmin", () => ({
  verifyToken: (token: any) => ({ firebase_user }),
}));

describe("Test the root path", () => {
  it("It should be 404", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(404);
  });

  it("firebase mock", async () => {
    const response = await request(app)
      .post("/api/v1/auth")
      .set("Authorization", "Bearer 1234567890");
    expect(response.status).toBe(200);
  });
});

describe("/api/v1/users/ TEST : getUsers function ", () => {
  test("getUsers has count 5", async () => {
    const response = await request(app)
      .get(PREFIX_USERS)
      .set("Authorization", "Bearer 1234567890");

    expect(response.status).toBe(200);
    expect(response.body.users.length).not.toBe(3);
    expect(response.body.users.length).toBe(5);
  });

  test("getUsers has properties", async () => {
    const { status, body } = await request(app)
      .get(PREFIX_USERS)
      .set("Authorization", "Bearer 1234567890");

    expect(status).toBe(200);
    expect(body.users[0]).toHaveProperty("id");
    expect(body.users[0]).toHaveProperty("firebaseId");
    expect(body.users[0]).toHaveProperty("isAdmin");
    expect(body.users[0]).toHaveProperty("isActive");
    expect(body.users[0]).toHaveProperty("isAnonymous");
    expect(body.users[0]).toHaveProperty("username");
    expect(body.users[0]).toHaveProperty("createdAt");
    expect(body.users[0]).toHaveProperty("updatedAt");
    expect(body.users[0]).not.toHaveProperty("uid");
    expect(body.users[0]).not.toHaveProperty("password");
  });
});

import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../../src/app";
import { firebase_user } from "../data/testData";
import { users } from "../../Prisma/seeds/users";

const PREFIX_USERS = "/api/v1/users";

beforeAll(async () => {
  const prisma = new PrismaClient();
  await prisma.user.createMany({ data: users });
});

afterAll(async () => {
  const prisma = new PrismaClient();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteUsers]);

  await prisma.$disconnect();
});

jest.mock("../../src/lib/FirebaseAdmin", () => ({
  verifyToken: (token: string) => {
    if (!token) {
      return {
        errorObj: {
          errorCode: 400,
          errorMessage: "ID token has invalid signature",
        },
      };
    }
    return firebase_user;
  },
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

describe("/api/v1/users/:id TEST : getUser by id function ", () => {
  test("http status should be 200", async () => {
    const res = await request(app)
      .get(PREFIX_USERS)
      .set("Authorization", "Bearer 1234567890");
    const user = res.body.users[0];

    const { status } = await request(app)
      .get(PREFIX_USERS + "/" + user.id)
      .set("Authorization", "Bearer 1234567890");

    expect(status).toBe(200);
  });

  test("getUser has properties", async () => {
    const res = await request(app)
      .get(PREFIX_USERS)
      .set("Authorization", "Bearer 1234567890");
    const user = res.body.users[0];

    const { body } = await request(app)
      .get(PREFIX_USERS + "/" + user.id)
      .set("Authorization", "Bearer 1234567890");

    expect(body.user).toHaveProperty("id");
    expect(body.user).toHaveProperty("firebaseId");
    expect(body.user).toHaveProperty("isAdmin");
    expect(body.user).toHaveProperty("isActive");
    expect(body.user).toHaveProperty("isAnonymous");
    expect(body.user).toHaveProperty("username");
    expect(body.user).toHaveProperty("createdAt");
    expect(body.user).toHaveProperty("updatedAt");
    expect(body.user).not.toHaveProperty("uid");
    expect(body.user).not.toHaveProperty("password");
  });

  test("getUser has values", async () => {
    const res = await request(app)
      .get(PREFIX_USERS)
      .set("Authorization", "Bearer 1234567890");
    const user = res.body.users[0];

    const { status, body } = await request(app)
      .get(PREFIX_USERS + "/" + user.id)
      .set("Authorization", "Bearer 1234567890");

    expect(status).toBe(200);
    expect(user).toMatchObject(body.user);
    expect(res.body.users[1]).not.toMatchObject(body.user);
  });
});

describe("/api/v1/users/create TEST : createUser function", () => {
  test("http status should be 200 and value", async () => {
    const { status, body } = await request(app)
      .post(PREFIX_USERS + "/create")
      .send({ firebaseToken: "1234567890" });

    expect(status).toBe(200);
    expect(body.user.username).toEqual(firebase_user.name);
    expect(body.user.firebaseId).toEqual(firebase_user.uid);
    expect(body.user).toHaveProperty("id");
    expect(body.user).toHaveProperty("isAdmin");
    expect(body.user).toHaveProperty("isActive");
    expect(body.user).toHaveProperty("isAnonymous");
    expect(body.user).not.toHaveProperty("password");
    expect(body.user).not.toHaveProperty("errorObj");
  });

  test("should receive error", async () => {
    const { status, body } = await request(app).post(PREFIX_USERS + "/create");

    expect(status).toBe(400);
    expect(body.user).toHaveProperty("errorObj");
    expect(body.user.errorObj).toHaveProperty("errorCode");
    expect(body.user.errorObj).toHaveProperty("errorMessage");
    expect(body.user).not.toHaveProperty("id");
  });
});

describe("/api/v1/users/edit/:userId : TEST editUser", () => {
  test("edit user by edit_data successfully", async () => {
    const res = await request(app)
      .get(PREFIX_USERS)
      .set("Authorization", "Bearer 1234567890");

    const userId = res.body.users[0].id;

    const edit_data = {
      username: "hello world",
      isAdmin: true,
      isActive: false,
      isAnonymous: true,
    };

    const { status, body } = await request(app)
      .put(PREFIX_USERS + "/edit/" + userId)
      .set("Authorization", "Bearer 1234567890")
      .send({ ...edit_data });

    expect(status).toBe(200);
    expect(body.user.id).toEqual(userId);
    expect(body.user.username).toEqual(edit_data.username);
    expect(body.user.isAdmin).toEqual(edit_data.isAdmin);
    expect(body.user.isActive).toEqual(edit_data.isActive);
    expect(body.user.isAnonymous).toEqual(edit_data.isAnonymous);
    expect(body.user).not.toHaveProperty("password");
    expect(body.user).not.toHaveProperty("errorObj");
  });
});

import request from "supertest";
import app from "../../src/app";
import { firebase_user } from "../data/testData";

jest.mock("../../src/lib/FirebaseAdmin", () => ({
  verifyToken: (token: any) => ({ firebase_user }),
}));

const PREFIX_USERS = "/api/v1/users";

describe("Test the root path", () => {
  it("It should response the GET method", async () => {
    const response = await request(app).get("/api/v1");
    expect(response.status).toBe(200);
  });

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

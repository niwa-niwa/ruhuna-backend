import request from "supertest";
import app from "../../src/app";

describe("TEST Middleware verifyAccessToken", () => {
  test("it should be success", async () => {
    const res = await request(app)
      .get("/api/v1/auth")
      .set("Authorization", "Bearer token_auth_user");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("currentUser");
    expect(res.body.currentUser).toHaveProperty("id");
    expect(res.body.currentUser).toHaveProperty("username");
    expect(res.body.currentUser).toHaveProperty("firebaseId");
    expect(res.body.currentUser).toHaveProperty("isAdmin");
    expect(res.body.currentUser).toHaveProperty("isAdmin");
    expect(res.body.currentUser).toHaveProperty("isActive");
    expect(res.body.currentUser).toHaveProperty("isAnonymous");
    expect(res.body.currentUser).not.toHaveProperty("password");
  });
  test("it should be fail", async () => {
    const res = await request(app).get("/api/v1/auth");

    expect(res.status).toBe(400);
    expect(res.body).not.toHaveProperty("currentUser");
  });
  test("it should be fail", async () => {
    const res = await request(app)
      .get("/api/v1/auth")
      .set("Authorization", "Bearer 123450");

    expect(res.status).toBe(400);
    expect(res.body).not.toHaveProperty("currentUser");
  });
});

import request from "supertest";
import app from "../../src/app";

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
});

import { Village } from "@prisma/client";
/**
 * Q. What is the model for
 * A. The model's roll is  same as a channel that is been using in the Slack
 *
 **/
import request from "supertest";
import app from "../../src/app";
import { tokens } from "../test_config/testData";

const PREFIX_VILLAGES = "/api/v1/villages";

describe("/api/v1/villages TEST villageController ", () => {
  test("POST /api/v1/villages/create Create a village", async () => {
    const { status, body } = await request(app)
      .post(PREFIX_VILLAGES + "/create")
      .set("Authorization", `Bearer ${tokens.auth_user}`)
      .send({ name: "HellO", description: "村の説明" });

    expect(status).toBe(200);
    expect(body).toHaveProperty("village");
    expect(body.village).toHaveProperty("id");
    expect(body.village).toHaveProperty("name");
    expect(body.village).toHaveProperty("description");
    expect(body.village).toHaveProperty("users");
  });

  test("get a village data by villageId", async () => {});

  test("edit a village data", async () => {});

  test("delete a village", async () => {});
});

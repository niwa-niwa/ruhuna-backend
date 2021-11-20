const request = require("supertest");
const app = require("../../src/app");

// TODO : doesn't work because "app" is not exported
describe("Get Users", () => {
  test("It should be users", (done) => {
    request(app)
      .get("/users")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

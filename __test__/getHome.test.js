const request = require("supertest");
const app = require("../src/server/app");

describe("Test Home", () => {
    test("GET /", (done) => {
      request(app)
        .get("/api")
        .expect(200)
        .expect((res) => {
            res.text = "This is Go Travel api";
        })
        .end((err, res) => {
            if (err) return done(err);
            return done();
        });
    });
});
import request from "supertest";
import path from "path";
import createServer from "../../server/utils/createServer";

const app = createServer(path.join(__dirname, "static"));

describe("Test if server is running", () => {
	it("should return a 200 status code", (done) => {
		request(app).get("/api").expect(200, done);
	});
});
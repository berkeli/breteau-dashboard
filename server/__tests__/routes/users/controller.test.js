import request from "supertest";
import path from "path";

jest.mock(
	"../../../middleware/auth/auth.middleware",
	() => (req, res, next) => {
		if (!req) {
			req = {};
		}
		req.user = {
			id: "123",
			email: "",
			name: "Tes",
		};
		next();
	}
);
import createServer from "../../../utils/createServer";

const app = createServer(path.join(__dirname, "static"));

const endpoint = "/api/users/";

describe("GET users enpoint tests", () => {
	it("should return a 401 unauthorized code without JWT token", (done) => {
		request(app).get(endpoint).expect(401, done);
	});

	it("should return message notifying there's no token", (done) => {
		request(app)
			.get(endpoint)
			.expect(401)
			.then((res) => {
				expect(res.text).toBe("No authorization token was found");
				done();
			});
	});
});

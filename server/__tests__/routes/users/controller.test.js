import request from "supertest";
import path from "path";
import createServer from "../../../utils/createServer";

const app = createServer(path.join(__dirname, "static"));

const endpoint = "/api/users/";

const OLD_ENV = process.env;

beforeEach(() => {
	jest.resetModules();
	process.env = {
		M2M_AUTH0_CLIENT_ID: "test",
		M2M_AUTH0_CLIENT_SECRET: "test",
		AUTH0_DOMAIN: "ldn8-final-project.eu.auth0.com",
		AUTH0_AUDIENCE: "breteau-api",
		AUTH0_CLIENT_ID: "test",
		AUTH0_CONNECTION: "Username-Password-Authentication",
		AUTH0_CONNECTION_ID: "test",
	};
});

afterAll(() => {
	process.env = OLD_ENV;
});

describe("GET users endpoint tests", () => {
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

import request from "supertest";
import path from "path";
import createServer from "../../server/utils/createServer";

const app = createServer(path.join(__dirname, "static"));

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

describe("Test if server is running", () => {
	it("should return a 200 status code", (done) => {
		request(app).get("/api").expect(200, done);
	});
});

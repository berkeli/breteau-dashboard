import logger from "../../utils/logger";

describe("pino logger utility", () => {
	it("should be a object", () => {
		expect(typeof logger).toBe("object");
	});

	it("should have info function", () => {
		expect(typeof logger.info).toBe("function");
	});
});

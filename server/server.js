import path from "path";

import createServer from "./utils/createServer";
import { disconnectDb } from "./db";
import logger from "./utils/logger";

const port = parseInt(process.env.PORT || "3000");
const staticDir = path.join(__dirname, "static");
const server = createServer(staticDir);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	// eslint-disable-next-line no-console
	logger.info(`Listening on ${bind}`);
});

process.on("SIGTERM", () => disconnectDb());

server.listen(port);

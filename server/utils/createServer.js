import express from "express";
import morgan from "morgan";

import router from "../routes/api";
import {
	configuredHelmet,
	httpsOnly,
	logErrors,
	pushStateRouting,
} from "../middleware";

const apiRoot = "/api";

export default (staticDir) => {
	const app = express();
	app.use(express.json());
	app.use(configuredHelmet());
	app.use(morgan("dev"));

	if (app.get("env") === "production") {
		app.enable("trust proxy");
		app.use(httpsOnly());
	}

	app.use(apiRoot, router);

	app.use(express.static(staticDir));
	app.use(pushStateRouting(apiRoot, staticDir));

	app.use(logErrors());
	return app;
};

import * as env from "dotenv";

env.config();

const config = {
	AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
	AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
	AUTH0_CONNECTION: process.env.AUTH0_CONNECTION,
	AUTH0_REDIRECT: process.env.AUTH0_REDIRECT,
};

export default config;

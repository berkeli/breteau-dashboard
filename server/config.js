import * as env from "dotenv";

env.config();

const config = {
	DATABASE_URL: process.env.DATABASE_URL,
	AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
	AUTH0_CLIENT_ID: process.env.M2M_AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET: process.env.M2M_AUTH0_CLIENT_SECRET,
	AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
	AUTH0_CONNECTION: process.env.AUTH0_CONNECTION,
	AUTH0_CONNECTION_ID: process.env.AUTH0_CONNECTION_ID,
	AUTH0_REDIRECT: process.env.AUTH0_REDIRECT,
};

export default config;

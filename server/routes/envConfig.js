import env from "dotenv";
env.config();

export default (_, res) => {
	res.json({
		API_URL: process.env.API_URL,
		AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN,
		AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
	});
};

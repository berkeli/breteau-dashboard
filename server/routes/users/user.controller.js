import { ManagementClient } from "auth0";
import config from "../../config";
import logger from "../../utils/logger";

const auth0 = new ManagementClient({
	domain: config.AUTH0_DOMAIN,
	clientId: config.AUTH0_CLIENT_ID,
	clientSecret: config.AUTH0_CLIENT_SECRET,
});

const queryToLucene = (string) =>
	string.length > 2 ? `name:${string}*` : `name:*${string}*`;

export const getUsers = (req, res) => {
	const { searchQuery } = req.query;
	const params = {
		search_engine: "v3",
		sort: "created_at:-1",
	};
	if (searchQuery) {
		params.q = queryToLucene(searchQuery);
	}
	auth0.getUsers(params, (err, users) => {
		if (err) {
			logger.error(err.message);
			res.status(500).json({
				message: "Error getting users",
			});
		} else {
			res.json(users);
		}
	});
};

export const createUser = (req, res) => {
	const { firstName, lastName, email } = req.query;

	const user = {
		name: `${firstName} ${lastName}`,
		email,
		email_verified: false,
		connection: config.AUTH0_CONNECTION,
		verify_email: false,
	};

	auth0.createUser(user, (err, user) => {
		if (err) {
			logger.error(err.message);
			res.status(500).json(err);
		} else {
			res.json(user);
		}
	});
};

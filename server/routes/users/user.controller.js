import config from "../../config";
import logger from "../../utils/logger";
import { auth0, queryToLucene } from "./helpers";

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
	const { fullName, email } = req.body;

	const user = {
		name: fullName,
		email,
		password: Math.random().toString(36).slice(-12),
		email_verified: false,
		connection: config.AUTH0_CONNECTION,
		verify_email: false,
	};

	auth0.createUser(user, (err, user) => {
		if (err) {
			logger.error(err.message);
			res.status(500).json(err);
		} else {
			resetUserPassword(
				user.identities.user_id,
				user.email,
				config.AUTH0_CONNECTION_ID
			);
			res.json(user);
		}
	});
};

export const getRoles = (_, res) => {
	auth0.getRoles({}, (err, roles) => {
		if (err) {
			logger.error(err.message);
			res.status(500).json(err);
		} else {
			res.json(roles);
		}
	});
};

const resetUserPassword = async (user_id, email, connection_id) => {
	auth0.createPasswordChangeTicket(
		{
			result_url: config.AUTH0_REDIRECT,
			user_id,
			email,
			connection_id,
		},
		(err) => {
			if (err) {
				logger.error(err.message);
			}
		}
	);
};

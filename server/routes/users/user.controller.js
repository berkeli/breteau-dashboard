import config from "../../config";
import logger from "../../utils/logger";
import { auth0 } from "./helpers";
import pool from "../../db/";

export const getUsersFromDB = (req, res) => {
	const { searchQuery } = req.query;
	syncUsers();
	let query = "SELECT * FROM person";
	const vars = [];
	if (searchQuery) {
		query += " WHERE LOWER(full_name) LIKE $1";
		vars.push(`%${searchQuery}%`);
	}

	pool
		.query(query, vars)
		.then((result) =>
			result.rows.map((row) => ({ ...row, roles: row.roles?.split(",") || [] }))
		)
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).send(err.message);
		});
};

export const syncUsers = async () => {
	const params = {
		search_engine: "v3",
		sort: "created_at:-1",
	};

	auth0
		.getUsers(params)
		.then((users) => {
			return mergeRolesIntoUsers(users);
		})
		.catch((err) => {
			logger.error(err);
		});
};

export const createUser = async (req, res) => {
	const { fullName, email, roles, country } = req.body;

	const user = {
		name: fullName,
		email,
		user_metadata: {
			country,
		},
		password: Math.random().toString(36).slice(-12),
		email_verified: false,
		connection: config.AUTH0_CONNECTION,
		verify_email: false,
	};

	await auth0
		.createUser(user)
		.then(async (user) => {
			const id = user.user_id;
			await resetUserPassword(id);
			await assignRolesToUser(id, roles);
			const query = {
				text: "INSERT INTO person (auth0_id, full_name, email, roles, country) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO UPDATE SET auth0_id = $1, full_name = $2, email = $3, roles = $4, country = $5",
				values: [id, fullName, email.toLowerCase(), roles.join(","), country],
			};
			await pool.query(query);
			res.json(user);
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).json({ message: err.message });
		});
};

export const updateUser = async (req, res) => {
	const { full_name, email, roles, country, auth0_id, allRoles, blocked } =
		req.body;

	const user = {
		name: full_name,
		email,
		blocked,
		user_metadata: {
			country,
		},
		connection: config.AUTH0_CONNECTION,
	};

	await auth0
		.updateUser({ id: auth0_id }, user)
		.then(async (user) => {
			await auth0.removeRolesFromUser({ id: auth0_id }, { roles: allRoles });
			if (roles.length > 0) {
				await assignRolesToUser(auth0_id, roles);
			}
			const query = {
				text: "INSERT INTO person (auth0_id, full_name, email, roles, country, blocked) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (email) DO UPDATE SET auth0_id = $1, full_name = $2, email = $3, roles = $4, country = $5, blocked = $6",
				values: [
					auth0_id,
					full_name,
					email.toLowerCase(),
					roles.join(","),
					country,
					blocked || false,
				],
			};
			pool.query(query, (err, results) => {
				if (err) {
					logger.error(err);
					res.status(500).send(err.message);
				}
				res.json(results.rows[0]);
			});
			res.json(user);
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).json({ message: err.message });
		});
};

export const getRoles = (_, res) => {
	auth0.getRoles({}, (err, roles) => {
		if (err) {
			logger.error(err);
			res.status(500).json(err);
		} else {
			res.json(roles);
		}
	});
};

export const resetPwdHandler = async (req, res) => {
	const { user_id } = req.params;
	await resetUserPassword(user_id);
	res.json({ message: "Password reset ticket sent" });
};

const resetUserPassword = async (user_id) => {
	await auth0.createPasswordChangeTicket({
		result_url: config.AUTH0_REDIRECT,
		user_id,
	});
};

const assignRolesToUser = async (id, roles) => {
	await auth0.assignRolestoUser({ id }, { roles });
};

const mergeRolesIntoUsers = async (users) => {
	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		await auth0.getUserRoles({ id: user.user_id }).then((roles) => {
			user.roles = roles.map((role) => role.id).join(",");
			const query =
				"INSERT INTO person(auth0_id, country, email, full_name, created_at, roles, blocked, last_login) " +
				"VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (email)" +
				"DO UPDATE SET auth0_id = $1, country = $2, email = $3, full_name = $4, created_at = $5, roles = $6, blocked=$7, last_login=$8";
			pool.query(
				query,
				[
					user.user_id,
					user.user_metadata?.country || "",
					user.email,
					user.name,
					user.created_at,
					user.roles,
					user.blocked || false,
					user.last_login,
				],
				(err) => {
					if (err) {
						logger.error(err);
					}
				}
			);
		});
	}
	return;
};

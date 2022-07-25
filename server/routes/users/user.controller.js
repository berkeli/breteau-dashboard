import config from "../../config";
import logger from "../../utils/logger";
import { auth0 } from "./helpers";
import { pool } from "../../db";

export const getUsers = async (req, res) => {
	const { searchQuery, page, per_page } = req.query;
	const params = {
		search_engine: "v3",
		sort: "created_at:-1",
		q: "-blocked:true",
		page: page || 0,
		per_page: per_page || 10,
	};
	if (searchQuery) {
		params.q += ` AND name:${searchQuery}*`;
	}

	// get total count for pagination
	const total_count = await auth0.getActiveUsersCount();
	res.set({
		total_count,
		page: params.page,
		per_page: params.per_page,
	});

	// get users and add roles to each user
	auth0
		.getUsers(params)
		.then((users) => {
			return mergeRolesIntoUsers(users);
		})
		.then((usersWithRoles) => {
			res.json(usersWithRoles);
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).json({ message: err.message });
		});
};

export const createUser = async (req, res) => {
	const { fullName, email, roles } = req.body;

	const user = {
		name: fullName,
		email,
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
				text: "INSERT INTO person (auth0_id, full_name, email, roles) VALUES ($1, $2, $3, $4) ON CONFLICT (auth0_id) DO UPDATE SET full_name = $2, email = $3, roles = $4",
				values: [id, fullName, email, roles.join(",")],
			};
			pool.query(query);
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
			logger.error(err.message);
			res.status(500).json(err);
		} else {
			res.json(roles);
		}
	});
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
	const usersWithRoles = [];

	for (let i = 0; i < users.length; i++) {
		const user = users[i];
		await auth0.getUserRoles({ id: user.user_id }).then((roles) => {
			user.roles = roles;
			usersWithRoles.push(user);
		});
	}
	return usersWithRoles;
};

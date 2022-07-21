import pool from "../../db";

export const getInitiatives = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: "SELECT * FROM initiative",
	};

	if (searchQuery) {
		query.text += " WHERE LOWER(name) LIKE $1";
		query.values = ["%" + searchQuery.toLowerCase() + "%"];
	}

	pool.query(query, (err, results) => {
		if (err) {
			throw err;
		}
		res.json(results.rows);
	});
};

export const getInitiativeCategories = (_, res) => {
	pool.query("SELECT DISTINCT(category) FROM initiative", (err, results) => {
		if (err) {
			throw err;
		}
		res.json(results.rows);
	});
};

export const createInitiative = (req, res) => {
	const { name, category, description } = req.body;
	pool.query(
		"INSERT INTO initiative(name, category, description) VALUES ($1, $2, $3)",
		[name, category, description],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows);
		}
	);
};

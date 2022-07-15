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
		console.log(results.rows);
		res.json(results.rows);
	});
};

export const getInitiativeAreas = (_, res) => {
	pool.query("SELECT DISTINCT(area) FROM initiative", (err, results) => {
		if (err) {
			throw err;
		}
		res.json(results.rows);
	});
};

export const createInitiative = (req, res) => {
	const { name, area, description } = req.body;
	pool.query(
		"INSERT INTO initiative(name, area, description) VALUES ($1, $2, $3)",
		[name, area, description],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows);
		}
	);
};

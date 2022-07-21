import pool from "../../db";

export const getSchoolStats = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: "SELECT * FROM schoolstat",
	};

	if (searchQuery) {
		query.text += " WHERE LOWER(name) LIKE $1";
		query.values = ["%" + searchQuery.toLowerCase() + "%"];
	}

	// Country Order
	query.text += " ORDER BY country, name, location";
	pool.query(query, (err, results) => {
		if (err) {
			throw err;
		}
		res.json(results.rows);
	});
};

export const getSchoolStatCountries = (_, res) => {
	pool.query("SELECT DISTINCT(country) FROM schoolstat", (err, results) => {
		if (err) {
			throw err;
		}
		res.json(results.rows);
	});
};

export const createSchoolStat = (req, res) => {
	const { name, category, description } = req.body;
	pool.query(
		"INSERT INTO schoolstat(name, category, description) VALUES ($1, $2, $3)",
		[name, category, description],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows);
		}
	);
};

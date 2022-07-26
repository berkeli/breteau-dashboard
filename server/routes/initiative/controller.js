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

export const updateInitiative = (req, res) => {
	const { name, category, description, id } = req.body;
	pool.query(
		"UPDATE initiative SET name = $1, category = $2, description = $3 WHERE id = $4 RETURNING *",
		[name, category, description, id],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows[0]);
		}
	);
};

export const deleteInitiative = async (req, res) => {
	const { id } = req.params;

	const schedulesCount = await pool.query(
		"SELECT COUNT(*) FROM scheduletracker WHERE programmeInitiativeId = $1",
		[id]
	);

	if (schedulesCount.rows[0].count > 0) {
		res.status(400).json({
			message: "Cannot delete initiative with schedules",
		});
		return;
	}

	pool.query(
		"DELETE FROM initiative WHERE id = $1 RETURNING *",
		[id],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows[0]);
		}
	);
};

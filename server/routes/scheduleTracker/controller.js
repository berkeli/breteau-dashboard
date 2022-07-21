import pool from "../../db";

export const getSchedules = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: "SELECT * FROM schedule",
	};

	if (searchQuery) {
		query.text += " WHERE LOWER() LIKE $1";
		query.values = ["%" + searchQuery.toLowerCase() + "%"];
	}

	pool.query(query, (err, results) => {
		if (err) {
			throw err;
		}
		res.json(results.rows);
	});
};

export const getFormData = async (req, res) => {
	try {
		const schools = await pool.query("SELECT DISTINCT(name), id FROM school");
		const initiatives = await pool.query(
			"SELECT DISTINCT(name), id FROM initiative"
		);
		res.json({ schools: schools.rows, initiatives: initiatives.rows });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

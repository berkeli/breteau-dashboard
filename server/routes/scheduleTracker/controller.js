import pool from "../../db";
import { objectToQuery } from "../../utils/objectToQuery";

export const getSchedules = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: "SELECT * FROM scheduleTracker",
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
		const schools = await pool.query(
			"SELECT DISTINCT(name), id FROM schoolStat"
		);
		const initiatives = await pool.query(
			"SELECT DISTINCT(name), id FROM initiative"
		);
		res.json({ schools: schools.rows, initiatives: initiatives.rows });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const createScheduleTracker = async (req, res) => {
	try {
		const schools = await pool.query(
			"SELECT DISTINCT(name), id FROM schoolStat"
		);
		const initiatives = await pool.query(
			"SELECT DISTINCT(name), id FROM initiative"
		);
		res.json({ schools: schools.rows, initiatives: initiatives.rows });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

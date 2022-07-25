import pool from "../../db";
import { getUserId } from "../../utils/getUserId";
import { objectToQuery } from "../../utils/objectToQuery";

export const getSchedules = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: "SELECT school.name as school, initiative.name as initiative, scheduleTracker.duration, scheduleTracker.numofnewstudents, scheduleTracker.numofexistingstudents,	scheduleTracker.numofnewteachers, scheduleTracker.numofexistingteachers, scheduleTracker.grades, scheduleTracker.languagestaught, scheduleTracker.totalnumtablets, scheduleTracker.supportcategory,	scheduleTracker.supporttype FROM scheduleTracker inner join school on school.id = scheduleTracker.schoolId inner join initiative on initiative.id = scheduleTracker.programmeInitiativeId",
	};

	if (searchQuery) {
		query.text +=
			" WHERE LOWER(school.name) LIKE $1 or LOWER(initiative.name) LIKE $1";
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

export const createScheduleTracker = async (req, res) => {
	try {
		const userId = await getUserId(req);
		const scheduleTracker = { ...req.body, created_byid: userId };
		const insertQuery = objectToQuery(scheduleTracker);

		const results = await pool.query(
			`INSERT INTO scheduleTracker ${insertQuery}`
		);

		res.send(results.rows);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

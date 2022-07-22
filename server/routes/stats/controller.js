import pool from "../../db";
import logger from "../../utils/logger";

export const getTotals = async (req, res) => {
	try {
		const scheduleTracker = await pool.query(
			"SELECT SUM(numofnewstudents) AS students, SUM(numofnewteachers) AS teachers FROM scheduletracker"
		);

		const schoolStat = await pool.query(
			"SELECT COUNT(DISTINCT(country)) as countries, COUNT(*) AS schools FROM schoolstat"
		);

		res.send({
			students: scheduleTracker.rows[0].students,
			teachers: scheduleTracker.rows[0].teachers,
			countries: schoolStat.rows[0].countries,
			schools: schoolStat.rows[0].schools,
		});
	} catch (err) {
		logger.error(err);
		res.status(400).send({
			message: err.message,
		});
	}
};

export const getReach = async (req, res) => {
	try {
		const query =
			"SELECT SUM(numofnewstudents) AS new_students, " +
			" SUM(numofexistingstudents) AS existing_students, " +
			" SUM(numofnewteachers) AS new_teachers, " +
			" SUM(numofexistingteachers) AS existing_teachers, " +
			" DATE_TRUNC('month',created_at) AS month " +
			" FROM scheduletracker " +
			" GROUP BY DATE_TRUNC('month',created_at)" +
			" ORDER BY month" +
			" LIMIT 6";

		const reach = await pool.query(query);

		res.send(reach.rows);
	} catch (err) {
		logger.error(err);
		res.status(400).send({
			message: err.message,
		});
	}
};

export const countryStats = async (req, res) => {
	try {
		const query =
			"SELECT schoolstat.country AS name, COUNT(DISTINCT(schoolstat.id)) AS school_count, " +
			" SUM(scheduletracker.numofexistingteachers) AS existing_teachers, " +
			" SUM(scheduletracker.numofnewteachers) AS new_teachers, " +
			" SUM(scheduletracker.numofexistingstudents) AS existing_students, " +
			" SUM(scheduletracker.numofnewstudents) AS new_students, " +
			" MIN(schoolstat.deploymentdate) AS earliest_deployment " +
			" FROM schoolstat LEFT JOIN scheduletracker ON schoolstat.id = scheduletracker.schoolid GROUP BY schoolstat.country";

		const countries = await pool.query(query);

		const formatData = countries.rows.reduce((formatted, country) => {
			formatted[country.name] = {
				school_count: country.school_count || 0,
				existing_teachers: country.existing_teachers || 0,
				new_teachers: country.new_teachers || 0,
				existing_students: country.existing_students || 0,
				new_students: country.new_students || 0,
				earliest_deployment: country.earliest_deployment,
			};
			return formatted;
		}, {});

		res.send(formatData);
	} catch (err) {
		logger.error(err);
		res.status(400).send({
			message: err.message,
		});
	}
};

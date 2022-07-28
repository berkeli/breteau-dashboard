import pool from "../../db";
import { getUserId } from "../../utils/getUserId";
import { getUserPermissions } from "../../utils/getUserPermissions";
import logger from "../../utils/logger";
import { objectToQuery, objectToQueryUpdate } from "../../utils/objectToQuery";

export const getSchedules = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: `SELECT scheduleTracker.id, school.name as school, person.full_name, initiative.name as initiative, scheduleTracker.duration, 
		scheduleTracker.numofnewstudents, scheduleTracker.numofexistingstudents,	
		scheduleTracker.numofnewteachers, scheduleTracker.numofexistingteachers, 
		scheduleTracker.grades, scheduleTracker.languagestaught, scheduleTracker.totalnumtablets, 
		scheduleTracker.supportcategory, scheduleTracker.supporttype, scheduleTracker.deliveredbyid, 
		person.auth0_id as delivered_by_auth0_id, createdBy.auth0_id as created_by_auth0_id
		FROM scheduleTracker 
		INNER JOIN school on school.id = scheduleTracker.schoolId 
		INNER JOIN initiative on initiative.id = scheduleTracker.programmeInitiativeId 
		INNER JOIN person on scheduleTracker.deliveredById = person.id 
		INNER JOIN person as createdBy on scheduleTracker.created_byid = createdBy.id
		`,
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
		const persons = await pool.query(
			"SELECT id, full_name, auth0_id FROM person"
		);
		res.json({
			schools: schools.rows,
			initiatives: initiatives.rows,
			persons: persons.rows,
		});
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

export const updateSchedule = async (req, res) => {
	try {
		const { id } = req.params.id;
		const schedule = req.body;
		console.log(schedule);
		const userId = await getUserId(req);

		const userPermissions = getUserPermissions(req);

		if (
			!(
				userPermissions.includes("admin") ||
				userPermissions.includes("super-admin")
			)
		) {
			const prevRecord = await pool.query(
				"SELECT count(*) FROM scheduleTracker WHERE id=$1 AND(deliveredbyid=$2 OR createdbyid=$2)",
				[id, userId]
			);
			if (prevRecord.rows[0].count === 0) {
				res
					.status(403)
					.json({ message: "You are not authorized to edit this record" });
				return;
			}
		}

		const insertQuery = objectToQueryUpdate(schedule);

		pool.query(
			`UPDATE scheduletracker SET numofnewstudents=$1, numofexistingstudents=$2, numofnewteachers=$3, numofexistingteachers=$4, 
			grades=$5, languagestaught=$6, totalnumtablets=$7, supportcategory=$8, supporttype=$9, deliveredbyid=$10, duration=$11 
			WHERE id=$12 RETURNING id`,
			[
				schedule.numOfNewStudents,
				schedule.numOfExistingStudents,
				schedule.numOfNewTeachers,
				schedule.numOfExistingTeachers,
				schedule.grades,
				schedule.languagesTaught,
				schedule.totalNumTablets,
				schedule.supportCategory,
				schedule.supportType,
				schedule.deliveredById,
				schedule.duration,
				id,
			],
			(err, results) => {
				if (err) {
					console.log(err);
					throw err;
				}
				console.log(results);
				res.send(results.rows);
			}
		);
	} catch (error) {
		logger.error(error);
		res.status(400).json({ message: error.message });
	}
};

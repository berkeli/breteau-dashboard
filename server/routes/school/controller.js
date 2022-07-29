import pool from "../../db";
import { getUserId } from "../../utils/getUserId";

export const getSchools = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: `SELECT school.id, school.name, school.description,
					school.location, school.country, school.status, school.deploymentdate,
					school.created_at, person.full_name FROM school
					INNER JOIN person ON person.id = school.responsibleid`,
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

export const getSchoolCountries = (_, res) => {
	pool.query(
		"SELECT DISTINCT(country) FROM school ORDER BY country",
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows);
		}
	);
};

export const getSchoolStatuses = (_, res) => {
	pool.query(
		"SELECT DISTINCT(status) FROM school ORDER BY status",
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows);
		}
	);
};

export const createSchool = async (req, res) => {
	try {
		const userId = await getUserId(req);

		// Trim the data
		for (let field in req.body) {
			req.body[field] = req.body[field].trim();
		}

		let {
			name,
			description,
			location,
			country,
			responsible,
			status,
			deploymentdate,
		} = req.body;

		// Verify that the name of the 'Person Responsible' exists in the 'person' database
		pool.query(
			"SELECT * FROM person WHERE full_name = $1",
			[responsible],
			(err, results) => {
				if (err) {
					throw err;
				}

				if (results.rows.length === 0) {
					// No such person exists
					return res
						.status(400) // Bad request
						.json({ message: `No user exists with the name '${responsible}'` });
				}
				// Otherwise fetch the person 'id'
				let responsibleId = results.rows[0].id;

				pool.query(
					`INSERT INTO school(name, description, location, country, responsibleid, 
			        	 status, deploymentdate, created_ById)
		             	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
					[
						name,
						description,
						location,
						country,
						responsibleId,
						status,
						deploymentdate,
						userId, // 'person' ID number of the person creating this record
					],
					(err, results) => {
						if (err) {
							throw err;
						}
						res.json(results.rows);
					}
				);
			}
		);
	} catch (error) {
		res.status(400).json({ message: error.message });
					}
};


export const updateSchool = (req, res) => {
	console.log(req.body.id)
	try {
		//const userId = await getUserId(req);

		// Trim the data
		for (let field in req.body) {
			if (field !== "id") { // This is a number!
					req.body[field] = req.body[field].trim();
			}
		}

		console.log(req.body)

		let {
			name,
			description,
			location,
			country,
			responsiblename,
			status,
			deploymentdate,
			id,
		} = req.body;

		// Verify that the name of the 'Person Responsible' exists in the 'person' database
		pool.query(
			"SELECT * FROM person WHERE full_name = $1",
			[responsiblename],
			(err, results) => {
				if (err) {
					throw err;
				}

				if (results.rows.length === 0) {
					// No such person exists
					return res
						.status(400) // Bad request
						.json({ message: `No user exists with the name '${responsible}'` });
				}
				// Otherwise fetch the person 'id'
				let responsibleId = results.rows[0].id;

				pool.query(
					`UPDATE school
						SET name = $1,
							description = $2, 
							location = $3, 
							country = $4,
							responsibleid = $5, 
							status = $6, 
							deploymentdate = $7
								WHERE id = $8 RETURNING *`,
					[
						name,
						description,
						location,
						country,
						responsibleId,
						status,
						deploymentdate,
						id, // ID of the School record in the database
					],
					(err, results) => {
						if (err) {
							res.status(400).json({ message: err.message });
							return;
						}
						res.json(results.rows);
					}
				);
			}
		);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteSchool = async (req, res) => {
	const { id } = req.params;
	console.log(id)

	pool.query(
		"DELETE FROM school WHERE id = $1 RETURNING *",
		[id],
		(err, results) => {
			if (err) {
				throw err;
			}
			res.json(results.rows[0]);
		}
	);
};

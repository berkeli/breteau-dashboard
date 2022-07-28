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

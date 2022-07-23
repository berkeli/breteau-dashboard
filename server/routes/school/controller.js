import pool from "../../db";

export const getSchools = (req, res) => {
	const { searchQuery } = req.query;
	const query = {
		text: "SELECT * FROM school",
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

export const createSchool = (req, res) => {

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
	pool.query("SELECT * FROM person WHERE full_name = $1", [responsible], (err, results) => {
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
		// Format the Deployment Date
		let [day, month, year] = deploymentdate.split("/");
		// format Date string as `yyyy-mm-dd`
		day = day.padStart(2, "0");
		month = month.padStart(2, "0");
		deploymentdate = `${year}-${month}-${day}`;
		description = "ditto";
		// For now, assume Person 1
		let created_ById = 1;

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
				created_ById,
			],
			(err, results) => {
				if (err) {
					throw err;
				}
				res.json(results.rows);
			}
		);
	});
};

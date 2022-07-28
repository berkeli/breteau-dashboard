import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import pool from "../db";
import logger from "../utils/logger";
import initiatives from "./initiative";
import schools from "./school";
import stats from "./stats";


const router = Router();

router.get("/", (_, res) => {
	pool.query("SELECT * FROM person WHERE NOT blocked", (err, result) => {
		if (err) {
			logger.error(err);
			res.status(500).json({ message: err.message });
		} else {
			res.json(result.rows);
		}
	});
});

function genericIntErrorMessage(theId, response, errType, text = "") {
	let err =
		errType === 1
			? new Error(`'${theId}': ID must be a positive, nonzero integer.`)
			: new Error(`No ${text} with ID '${theId}' exists.`);

	logger.error(err);
	response.status(400).json({ message: err.message });
}

// GET - Return a single Person by ID.
// This Endpoint is needed to convert numeric IDs to the name of the person

router.get("/personbyid/:personId", function (request, response) {
	const personId = Number(request.params.personId);

	if (
		Number.isNaN(personId) ||
		!Number.isSafeInteger(personId) ||
		personId <= 0
	) {
		genericIntErrorMessage(personId, response, 1);
		return;
	}

	pool.query(
		"SELECT * FROM person WHERE id=$1",
		[personId],
		(err, result) => {
			if (err) {
				logger.error(err);
				response.status(500).json({ message: err.message });
			} else {
				let reply = result.rows;
				if (reply.length === 0) {
					genericIntErrorMessage(personId, response, 2, "Person");
					return;
				}

				return response.json(reply); // Success
			}
		}
	);
});

// GET - Using the Person's name, check their existence in the database
// This Endpoint is needed to determine the numeric ID which corresponds to the name of the person

router.get("/personbyname/:personId", function (request, response) {
	const personId = Number(request.params.personId);

	if (
		Number.isNaN(personId) ||
		!Number.isSafeInteger(personId) ||
		personId <= 0
	) {
		genericIntErrorMessage(personId, response, 1);
		return;
	}

	pool.query(
		"SELECT * FROM person WHERE id=$1",
		[personId],
		(err, result) => {
			if (err) {
				logger.error(err);
				response.status(500).json({ message: err.message });
			} else {
				let reply = result.rows;
				if (reply.length === 0) {
					genericIntErrorMessage(personId, response, 2, "Person");
					return;
				}

				return response.json(reply); // Success
			}
		}
	);
});

router.use(checkJwt);
router.use("/users", users);
router.use("/stats", stats);
router.use("/initiatives", initiatives);
router.use("/schools", schools);

export default router;

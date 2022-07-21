import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import pool from "../db";
import logger from "../utils/logger";
import initiatives from "./initiative";
import schoolstats from "./schoolstat";

const router = Router();

router.get("/", (_, res) => {
	pool.query("SELECT * FROM person", (err, result) => {
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

router.get("/oneperson/:personId", function (request, response) {
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
console.log(reply)
				return response.json(reply); // Success
			}
		}
	);
});

router.use(checkJwt);
router.use("/users", users);
router.use("/initiatives", initiatives);
router.use("/schoolstats", schoolstats);

export default router;

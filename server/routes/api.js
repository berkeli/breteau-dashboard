import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import pool from "../db";
import logger from "../utils/logger";
import initiatives from "./initiative";

const router = Router();

function genericIntErrorMessage(theId, response, errType, text = "") {
	let err =
		errType === 1
			? new Error(`'${theId}': ID must be a positive, nonzero integer.`)
			: new Error(`No ${text} with ID '${theId}' exists.`);

	logger.error(err);
	response.status(400).json({ message: err.message });
}

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

// GET - Return a single SchoolStat by ID.
router.get("/schoolstat/:schoolstatId", function (request, response) {
	const schoolStatId = Number(request.params.schoolStatId);

	if (
		Number.isNaN(schoolStatId) ||
		!Number.isSafeInteger(schoolStatId) ||
		schoolStatId <= 0
	) {
		genericIntErrorMessage(schoolStatId, response, 1);
		return;
	}

	pool.query(
		"SELECT * FROM schoolstat WHERE id=$1",
		[schoolStatId],
		(err, result) => {
			if (err) {
				logger.error(err);
				response.status(500).json({ message: err.message });
			} else {
				let reply = result.rows;
				if (reply.length === 0) {
					genericIntErrorMessage(schoolStatId, response, 2, "SchoolStat");
					return;
				}

				return response.json(reply); // Success
			}
		}
	);
});

router.use(checkJwt);
router.use("/users", users);
router.use("/initiatives", initiatives);

export default router;

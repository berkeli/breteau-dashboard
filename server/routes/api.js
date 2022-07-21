import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import pool from "../db";
import logger from "../utils/logger";
import initiatives from "./initiative";
import scheduleTracker from "./scheduleTracker";

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
router.use(checkJwt);
router.use("/users", users);
router.use("/initiatives", initiatives);
router.use("/schedule-tracker", scheduleTracker);

export default router;

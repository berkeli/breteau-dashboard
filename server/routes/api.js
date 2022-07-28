import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import pool from "../db";
import logger from "../utils/logger";
import initiatives from "./initiative";
import scheduleTracker from "./scheduleTracker";
import schools from "./school";
import stats from "./stats";

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
router.use("/stats", stats);
router.use("/initiatives", initiatives);
router.use("/schedule-tracker", scheduleTracker);
router.use("/schools", schools);

export default router;


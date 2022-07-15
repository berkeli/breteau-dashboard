import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import pool from "../db";
import logger from "../utils/logger";

const router = Router();

router.get("/", (_, res) => {
	pool.query("SELECT * FROM users", (err, result) => {
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

export default router;

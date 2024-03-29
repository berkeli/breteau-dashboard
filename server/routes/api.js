import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import initiatives from "./initiative";
import scheduleTracker from "./scheduleTracker";
import schools from "./school";
import stats from "./stats";

const router = Router();

router.get("/", (_, res) => {
	res.status(200).json({ message: "Breteau Dashboard API" });
});

router.use(checkJwt);
router.use("/users", users);
router.use("/stats", stats);
router.use("/initiatives", initiatives);
router.use("/schedule-tracker", scheduleTracker);
router.use("/schools", schools);

export default router;


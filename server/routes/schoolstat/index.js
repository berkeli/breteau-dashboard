import { Router } from "express";
import {
	getSchoolStats,
	getSchoolStatCountries,
	createSchoolStat,
} from "./controller";

const schoolStats = Router();
schoolStats
	.get("/", getSchoolStats)
	.get("/countries", getSchoolStatCountries)
	.post("/", createSchoolStat);

export default schoolStats;

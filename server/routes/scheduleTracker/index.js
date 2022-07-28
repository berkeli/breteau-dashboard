import { Router } from "express";
import {
	createScheduleTracker,
	getFormData,
	getSchedules,
	updateSchedule,
} from "./controller";

const scheduleTracker = Router();

scheduleTracker
	.get("/", getSchedules)
	.get("/form-data", getFormData)
	.post("/", createScheduleTracker)
	.put("/:id", updateSchedule);

export default scheduleTracker;

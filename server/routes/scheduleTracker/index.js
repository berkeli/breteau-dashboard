import { Router } from "express";
import {
	createScheduleTracker,
	deleteSchedule,
	getFormData,
	getSchedules,
	updateSchedule,
} from "./controller";

const scheduleTracker = Router();

scheduleTracker
	.get("/", getSchedules)
	.get("/form-data", getFormData)
	.post("/", createScheduleTracker)
	.put("/:id", updateSchedule)
	.delete("/:id", deleteSchedule);

export default scheduleTracker;

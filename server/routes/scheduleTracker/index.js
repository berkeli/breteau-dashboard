import { Router } from "express";
import { createScheduleTracker, getFormData, getSchedules } from "./controller";

const scheduleTracker = Router();

scheduleTracker.get("/", getSchedules);
scheduleTracker.get("/form-data", getFormData);
scheduleTracker.post("/", createScheduleTracker);

export default scheduleTracker;

import { Router } from "express";
import { getFormData, getSchedules } from "./controller";

const scheduleTracker = Router();

scheduleTracker.get("/", getSchedules);
scheduleTracker.get("/form-data", getFormData);

export default scheduleTracker;

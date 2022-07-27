import { Router } from "express";
import {
	getSchools,
	getSchoolCountries,
	getSchoolStatuses,
	createSchool,
} from "./controller";

const schools = Router();
schools
	.get("/", getSchools)
	.get("/countries", getSchoolCountries)
	.get("/statuses", getSchoolStatuses)
	.post("/", createSchool);

export default schools;

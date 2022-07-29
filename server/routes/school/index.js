import { Router } from "express";
import {
	getSchools,
	getSchoolCountries,
	getSchoolStatuses,
	createSchool,
	updateSchool,
	deleteSchool,
} from "./controller";

const schools = Router();
schools
	.get("/", getSchools)
	.get("/countries", getSchoolCountries)
	.get("/statuses", getSchoolStatuses)
	.post("/", createSchool)
	.put("/", updateSchool)
	.delete("/:id", deleteSchool);


export default schools;

import { Router } from "express";
import {
	getSchools,
	getSchoolCountries,
	createSchool,
} from "./controller";

const schools = Router();
schools
	.get("/", getSchools)
	.get("/countries", getSchoolCountries)
	.post("/", createSchool);

export default schools;

import { Router } from "express";
import {
	getInitiatives,
	getInitiativeCategories,
	createInitiative,
} from "./controller";

const initiatives = Router();

initiatives
	.get("/createschool", (req, res) => {
		res.send("Hello2");
	})
	.get("/", getInitiatives)
	.get("/categories", getInitiativeCategories)
	.post("/", createInitiative);

export default initiatives;

import { Router } from "express";
import {
	getInitiatives,
	getInitiativeCategories,
	createInitiative,
	updateInitiative,
	deleteInitiative,
} from "./controller";

const initiatives = Router();

initiatives
	.get("/", getInitiatives)
	.get("/categories", getInitiativeCategories)
	.post("/", createInitiative)
	.put("/", updateInitiative)
	.delete("/:id", deleteInitiative);

export default initiatives;

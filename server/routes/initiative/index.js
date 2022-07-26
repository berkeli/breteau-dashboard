import { Router } from "express";
import {
	getInitiatives,
	getInitiativeCategories,
	createInitiative,
	updateInitiative,
	deleteInitiative,
	getInitiativeStats,
} from "./controller";

const initiatives = Router();

initiatives
	.get("/", getInitiatives)
	.get("/categories", getInitiativeCategories)
	.get("/:id", getInitiativeStats)
	.post("/", createInitiative)
	.put("/", updateInitiative)
	.delete("/:id", deleteInitiative);

export default initiatives;

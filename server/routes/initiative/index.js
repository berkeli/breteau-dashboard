import { Router } from "express";
import {
	getInitiatives,
	getInitiativeAreas,
	createInitiative,
} from "./controller";

const initiatives = Router();

initiatives
	.get("/", getInitiatives)
	.get("/areas", getInitiativeAreas)
	.post("/", createInitiative);

export default initiatives;

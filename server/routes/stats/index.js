import { Router } from "express";
import { countryStats, getReach, getTotals } from "./controller";

const stats = Router();

stats
	.get("/totals", getTotals)
	.get("/reach", getReach)
	.get("/countries", countryStats);

export default stats;

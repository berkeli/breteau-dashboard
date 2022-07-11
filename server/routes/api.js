import { Router } from "express";
import envConfig from "./envConfig";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import { PrismaClient } from "../db";

const router = Router();
router
	.get("/envconfig", envConfig)
	.use(checkJwt)
	.get("/", (_, res) => {
		res.json({ message: "Breteau Dashboard" });
		PrismaClient.users.findMany();
	})
	.use("/users", users);

export default router;

import { Router } from "express";
import users from "./users";
import { checkJwt } from "../middleware/auth/auth.middleware";
import { PrismaClient } from "../db";
import { createSchool } from "./schools";

const router = Router();

router.use(checkJwt);

router.get("/", (_, res) => {
	res.json({ message: "Breteau Dashboard" });
	PrismaClient.users.findMany();
});

router.post("/schools", createSchool);
router.use("/users", users);

export default router;

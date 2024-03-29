import { Router } from "express";
import { checkPermissions } from "../../middleware/auth/permissions.middleware";
import {
	createUser,
	getRoles,
	getUsersFromDB,
	resetPwdHandler,
	updateUser,
} from "./user.controller";

const users = Router();

users.get("/", getUsersFromDB);
users.use(checkPermissions("super-admin"));
users.post("/", createUser);
users.get("/roles", getRoles);
users.put("/", updateUser);
users.put("/reset-password/:email", resetPwdHandler);

export default users;

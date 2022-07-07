import { Router } from "express";
import { checkPermissions } from "../../middleware/auth/permissions.middleware";
import { createUser, getRoles, getUsers } from "./user.controller";

const users = Router();

users.use(checkPermissions("super-admin"));

users.get("/", getUsers);
users.post("/", createUser);
users.get("/roles", getRoles);

export default users;

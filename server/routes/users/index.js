import { Router } from "express";
import { checkPermissions } from "../../middleware/auth/permissions.middleware";
import { createUser, getUsers } from "./user.controller";

const users = Router();

users.use(checkPermissions("super-admin"));

users.get("/", getUsers);
users.post("/", createUser);

export default users;

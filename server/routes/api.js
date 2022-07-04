import { Router } from "express";
import { checkJwt } from "../middleware/auth";
import { checkPermissions } from "../middleware/auth";

const router = Router();

router.use(checkJwt);

router.get("/", checkPermissions("super-admin"), async (_, res) => {
	res.json({
		message: "Hello World!",
	});
});

export default router;

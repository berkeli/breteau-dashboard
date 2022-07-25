import jwt_decode from "jwt-decode";
import pool from "../db";

export const getUserId = async (req) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt_decode(token);

	const result = await pool.query("SELECT ID FROM PERSON WHERE AUTH0_ID=$1", [
		decoded.sub,
	]);

	return result.rows[0].id;
};

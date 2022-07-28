import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
	connectionString: config.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.connect();

export default pool;

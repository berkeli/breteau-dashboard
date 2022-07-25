export const objectToQuery = (obj) => {
	const fields = [];
	const values = [];
	for (const [key, value] of Object.entries(obj)) {
		fields.push(key);
		values.push(`'${value}'`);
	}
	const query = `(${fields.join(", ")}) VALUES (${values.join(", ")})`;

	return query;
};

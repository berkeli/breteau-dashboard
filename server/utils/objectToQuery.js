export const objectToQuery = (obj) => {
	const fields = Object.keys(obj).join(", ");
	const values = Object.values(obj).join(", ");
	const query = `(${fields}) VALUES (${values})`;

	return query;
};

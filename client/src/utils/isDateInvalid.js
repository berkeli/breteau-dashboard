// Arbitrary Limit 01/02/1970
const feb1970Limit = new Date(1970, 1, 1).getTime();

// Date format is `yyyy-mm-dd`
function dateIsValid(dateStr) {
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	if (dateStr.match(regex) === null) {
		return false;
	}
	const date = new Date(dateStr);

	const timestamp = date.getTime();
	if (
		typeof timestamp !== "number" ||
		Number.isNaN(timestamp) ||
		timestamp < feb1970Limit
	) {
		return false;
	}
	return date.toISOString().startsWith(dateStr);
}
// Date Validation
export const isDateInvalid = (theDate) => {
	if (!theDate || !dateIsValid(theDate)) {
		return true;
	}

	return false; // Passed Validation i.e. Not Invalid
};

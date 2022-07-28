
const processSchoolRow = (rowOfData ) => {
	const { deploymentdate, created_at } = rowOfData;

	let myDate = new Date(deploymentdate);
	// Remove Time Portion

	let timePortion =
		(myDate.getTime() - myDate.getTimezoneOffset() * 60 * 1000) %
		(3600 * 1000 * 24);
	let dateOnly = new Date(myDate - timePortion)
		.toLocaleString()
		.replace(", 00:00:00", "");

    return {
			...rowOfData,
			deploymentdate: dateOnly,
			created_at: new Date(created_at).toLocaleString(),
			deploymentdate_sortvalue: myDate.getTime(), // Needed for sorting purposes in the React-Table
		};
};

export default processSchoolRow;

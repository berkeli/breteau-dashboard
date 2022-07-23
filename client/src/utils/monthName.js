const monthNames = [
	"JAN",
	"FEB",
	"MAR",
	"APR",
	"MAY",
	"JUN",
	"JUL",
	"AUG",
	"SEP",
	"OCT",
	"NOV",
	"DEC",
];

export default (month) => {
	const d = new Date(month);
	return monthNames[d.getMonth()];
};

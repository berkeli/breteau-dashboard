import SchoolData from "./schools.json"; // 50 lines of Sample Data
import DisplayEachCountry from "./DisplayEachCountry.js";

import "./DisplayData.css";

// Sort the Data by Countries, then by School Name, alphabetically

function sortTheData(data) {
	const eachCountry = new Set();
	const sortedByCountry = [];
	data.forEach((element) => {
		eachCountry.add(element.country);
		// initialise sortedByCountry[]
		sortedByCountry[element.country] = sortedByCountry[element.country] || [];
		sortedByCountry[element.country].push(element);
	});

	// Sort Each Country in alphabetical order
	const result = [...eachCountry].sort((a, z) => a.localeCompare(z));

	// Sort Each School in alphabetical order
    for (let countryName in sortedByCountry) {
         sortedByCountry[countryName].sort((a, z) => a.schoolName.localeCompare(z.schoolName));
    }

    return [result,sortedByCountry];
}

function DisplayData() {

    const results=sortTheData(SchoolData);

	return (
		<main role="main">
			<div>
				<DisplayEachCountry theCountries={results[0]} theData={results[1]}>
                </DisplayEachCountry>
			</div>
		</main>
	);
}

export default DisplayData;
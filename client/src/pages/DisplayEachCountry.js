import DisplayTable from "./DisplayTable.js";
import "./DisplayData.css";

const DisplayEachCountry = ({ theCountries, theData }) => {
	const listofCountries = theCountries.map((countryName) => (
		<div key ={countryName}>
			<h1 className="header">{countryName}</h1>
			<DisplayTable countryName={countryName} schoolData={theData}></DisplayTable>
		</div>
	));
	return <div>{listofCountries}</div>;
};

export default DisplayEachCountry;

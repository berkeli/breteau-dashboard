import { Td, Tr, Box, Text } from "@chakra-ui/react";
import React from "react";
import useFetch from "../../hooks/useFetch";


const SchoolStatRow = ({ schoolstat }) => {
	const {
		name,
		location,
		country,
		responsibleid,
		status,
		deploymentdate,
		created_at,
	} = schoolstat;
	let myDate = new Date(deploymentdate);
	// Remove Time Portion
	let timePortion =
		(myDate.getTime() - myDate.getTimezoneOffset() * 60 * 1000) %
		(3600 * 1000 * 24);
	let dateOnly = new Date(myDate - timePortion)
		.toLocaleString()
		.replace(", 00:00:00", "");

	// Fetch the name of the Person responsible using the ID number
	const {
		data: thePerson,
		isLoading,
		error,
	} = useFetch(`/oneperson/${responsibleid}`);

    if (isLoading || error) {
		return (
			<Box>
				{error && (
					<Text align="center">
						Something went wrong... <br />
						{error.message}
					</Text>
				)}
			</Box>
	);
}
    let personName=thePerson[0].full_name;

	return (
		<Tr>
			<Td>{country}</Td>
			<Td>{name}</Td>
			<Td>{location}</Td>
			<Td>{personName}</Td>
			<Td>{status}</Td>
			<Td>{dateOnly}</Td>
			<Td>{new Date(created_at).toLocaleString()}</Td>
		</Tr>
	);
};

export default SchoolStatRow;

import { Td, Tr, Box, Text } from "@chakra-ui/react";
import React from "react";
import useFetch from "../../hooks/useFetch";

const SchoolRow = ({ schoolData }) => {
	const {
		name,
		location,
		country,
		status,
		deploymentdate,
		description,
		created_at,
		full_name,
	} = schoolData;

	let myDate = new Date(deploymentdate);
	// Remove Time Portion
	let timePortion =
		(myDate.getTime() - myDate.getTimezoneOffset() * 60 * 1000) %
		(3600 * 1000 * 24);
	let dateOnly = new Date(myDate - timePortion)
		.toLocaleString()
		.replace(", 00:00:00", "");

	return (
		<Tr>
			<Td>{country}</Td>
			<Td>{name}</Td>
			<Td>{location}</Td>
			<Td>{description}</Td>
			<Td>{full_name}</Td>
			<Td>{status}</Td>
			<Td>{dateOnly}</Td>
			<Td>{new Date(created_at).toLocaleString()}</Td>
		</Tr>
	);
};

export default SchoolRow;

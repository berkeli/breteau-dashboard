import { Td, Tr } from "@chakra-ui/react";
import React from "react";

const ScheduleRow = ({ schedule }) => {
	const {
		full_name,
		school,
		initiative,
		duration,
		numofnewstudents,
		numofexistingstudents,
		numofnewteachers,
		numofexistingteachers,
		grades,
		languagestaught,
		totalnumtablets,
		supportcategory,
		supporttype,
	} = schedule;
	return (
		<Tr>
			<Td>{full_name}</Td>
			<Td>{school}</Td>
			<Td>{initiative}</Td>
			<Td>{duration}</Td>
			<Td>{numofnewteachers}</Td>
			<Td>{numofnewstudents}</Td>
			<Td>{numofexistingteachers}</Td>
			<Td>{numofexistingstudents}</Td>
			<Td>{totalnumtablets}</Td>
			<Td>{grades}</Td>
			<Td>{languagestaught}</Td>
			<Td>{supportcategory}</Td>
			<Td>{supporttype}</Td>
		</Tr>
	);
};

export default ScheduleRow;

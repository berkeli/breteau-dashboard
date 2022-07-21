import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const ScheduleRow = ({ schedule }) => {
	const { school, initiative, numberOfNewStudents, numberOfExistingStudents } =
		schedule;
	return (
		<Tr>
			<Td>{school}</Td>
			<Td>{initiative}</Td>
			<Td>{numberOfNewStudents}</Td>
			<Td>{numberOfExistingStudents}</Td>
		</Tr>
	);
};

export default ScheduleRow;

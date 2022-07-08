import {
	Tr,
	Td,
    Tbody,
} from "@chakra-ui/react";

const DisplayRows = ({ countryName, schoolData }) => {

	const listRows = schoolData[countryName].map(
		({ id, schoolName, responsible, status, location, deploymentYear }) => (
			<Tr key={id}>
				<Td>{schoolName}</Td>
				<Td>{location}</Td>
				<Td>{responsible}</Td>
				<Td>{status}</Td>
				<Td isNumeric>{deploymentYear}</Td>
			</Tr>
		)
	);
	return <Tbody>{listRows}</Tbody>;
};

export default DisplayRows;
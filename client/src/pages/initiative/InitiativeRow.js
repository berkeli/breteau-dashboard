import { Td, Text, Tr } from "@chakra-ui/react";
import React from "react";

const InitiativeRow = ({ initiative }) => {
	const { name, category, description, created_at } = initiative;
	return (
		<Tr>
			<Td>{name}</Td>
			<Td>{category}</Td>
			<Td>
				<Text noOfLines={[1, 2, 3]}>{description}</Text>
			</Td>
			<Td>{new Date(created_at).toLocaleString()}</Td>
		</Tr>
	);
};

export default InitiativeRow;

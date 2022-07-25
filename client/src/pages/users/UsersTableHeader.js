import { DragHandleIcon } from "@chakra-ui/icons";
import { Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

const UsersTableHeader = () => {
	return (
		<Thead>
			<Tr>
				<Th>Name</Th>
				<Th>Email</Th>
				<Th>Roles</Th>
				<Th>Last Login</Th>
				<Th>Created At</Th>
				<Th isNumeric>
					<DragHandleIcon />
				</Th>
			</Tr>
		</Thead>
	);
};

export default UsersTableHeader;

import { Td, Tr } from "@chakra-ui/react";
import React from "react";

const UserRow = ({ user }) => {
	console.log(user);
	return (
		<Tr>
			<Td>{user.name}</Td>
			<Td>{user.email}</Td>
			<Td>{user.email}</Td>
			<Td>{user.last_login}</Td>
			<Td>{user.created_at}</Td>
		</Tr>
	);
};

export default UserRow;

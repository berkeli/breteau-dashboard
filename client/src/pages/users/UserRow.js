import { Td, Tr } from "@chakra-ui/react";
import React from "react";

const UserRow = ({ user }) => {
	return (
		<Tr>
			<Td>{user.name}</Td>
			<Td>{user.email}</Td>
			<Td>PLACEHOLDER</Td>
			<Td>{user.last_login && new Date(user.last_login).toLocaleString()}</Td>
			<Td>{new Date(user.created_at).toLocaleString()}</Td>
		</Tr>
	);
};

export default UserRow;

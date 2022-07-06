import { Box, Table, Tbody, Text } from "@chakra-ui/react";
import React from "react";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import UserRow from "./UserRow";
import UsersTableHeader from "./UsersTableHeader";

const Users = () => {
	const { data, isLoading, error } = useFetch("/users");

	return (
		<Box>
			{isLoading && <Loading />}
			{error && (
				<Text align="center">
					Something went wrong... <br />
					{error.message}
				</Text>
			)}
			{data && (
				<Table>
					<UsersTableHeader />
					<Tbody>
						{data.map((user) => (
							<UserRow key={user.id} user={user} />
						))}
					</Tbody>
				</Table>
			)}
		</Box>
	);
};

export default Users;

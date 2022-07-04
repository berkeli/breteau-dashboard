import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";

const CreateUser = () => {
	return (
		<form>
			<Text as="h3"> Create a new User </Text>
			<FormControl>
				<FormLabel>First Name</FormLabel>
				<Input id="firstName" aria-describedby="first name" required />
				<FormLabel>Last Name</FormLabel>
				<Input id="lastName" aria-describedby="last name" required />
				<FormLabel>Email</FormLabel>
				<Input id="email" aria-describedby="email" required />
				<FormLabel>Role</FormLabel>
				<Input id="role" aria-describedby="role" required />
			</FormControl>
		</form>
	);
};

export default CreateUser;

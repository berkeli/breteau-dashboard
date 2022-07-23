import React, { useState } from "react";
import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Table,
	Tbody,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import _ from "lodash";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import UserRow from "./UserRow";
import UsersTableHeader from "./UsersTableHeader";
import CreateUser from "./CreateUser";

const Users = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQ, setDebouncedQ] = useState("");
	const {
		data: users,
		isLoading,
		error,
		triggerSearch,
	} = useFetch(`/users?searchQuery=${debouncedQ}`);

	const roles = useFetch("/users/roles");

	return (
		<>
			<ActionsBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setDebouncedQ={setDebouncedQ}
				triggerSearch={triggerSearch}
				roles={roles.data}
			/>
			<Box>
				{isLoading && <Loading />}
				{error && (
					<Text align="center">
						Something went wrong... <br />
						{error.message}
					</Text>
				)}
				{users && (
					<Table variant="striped">
						<UsersTableHeader />
						<Tbody>
							{users.map((user) => (
								<UserRow key={user.user_id} user={user} />
							))}
						</Tbody>
					</Table>
				)}
			</Box>
		</>
	);
};

const ActionsBox = ({
	searchQuery,
	setSearchQuery,
	setDebouncedQ,
	triggerSearch,
	roles,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleChange = (e) => {
		setSearchQuery(e.target.value);
		const debounce = _.debounce(() => setDebouncedQ(e.target.value), 500);
		debounce();
	};
	return (
		<Flex mb="8" px="4" justifyContent="space-between">
			<InputGroup>
				<InputLeftAddon>
					<BiSearchAlt />
				</InputLeftAddon>
				<Input
					placeholder="Search users..."
					value={searchQuery}
					width="auto"
					onChange={handleChange}
				/>
			</InputGroup>
			<Button onClick={onOpen}>Create User</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader> Create a new User </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CreateUser
							triggerSearch={triggerSearch}
							onClose={onClose}
							roles={roles}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default Users;

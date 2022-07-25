import { AddIcon, CloseIcon, EditIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
	Checkbox,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Td,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import EditUser from "./EditUser";

const UserRow = ({ user, triggerSearch, roles }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Tr>
			<Td>{user.name}</Td>
			<Td>{user.email}</Td>
			<Td>
				<Stack direction="column">
					{user.roles.map((role) => {
						return (
							<Checkbox
								key={`${role.id}-${user.user_id}`}
								disabled
								defaultChecked
							>
								{role.name}
							</Checkbox>
						);
					})}
				</Stack>
			</Td>
			<Td>{user.last_login && new Date(user.last_login).toLocaleString()}</Td>
			<Td>{new Date(user.created_at).toLocaleString()}</Td>
			<Td isNumeric>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<AddIcon />}
						variant="outline"
					/>
					<MenuList>
						<MenuItem icon={<EditIcon />} onClick={onOpen}>
							Edit User
						</MenuItem>
						<MenuItem icon={<CloseIcon />}>Block User</MenuItem>
						<MenuItem icon={<RepeatClockIcon />}>Reset Password</MenuItem>
					</MenuList>
				</Menu>
			</Td>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader> Update user details </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<EditUser
							triggerSearch={triggerSearch}
							onClose={onClose}
							user={user}
							roles={roles}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Tr>
	);
};

export default UserRow;

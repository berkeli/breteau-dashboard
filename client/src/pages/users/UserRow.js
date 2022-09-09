import { useAuth0 } from "@auth0/auth0-react";
import {
	AddIcon,
	CheckCircleIcon,
	CloseIcon,
	EditIcon,
	NotAllowedIcon,
	RepeatClockIcon,
	UnlockIcon,
} from "@chakra-ui/icons";
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
	Tooltip,
	Tr,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import EditUser from "./EditUser";

const UserRow = ({ user, triggerSearch, roles }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { getAccessTokenSilently } = useAuth0();
	const toast = useToast();
	const updateUserStatus = async (blocked) => {
		const token = await getAccessTokenSilently();
		const options = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...user,
				fullName: user.full_name,
				blocked,
				allRoles: roles.map((role) => role.id),
			}),
		};
		fetch(`${process.env.API_URL}/users`, options)
			.then((res) => res.json())
			.then(() => {
				toast({
					title: "User Updated",
					description: `User with email ${user.email} has been ${
						blocked ? "blocked" : "unblocked"
					}`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				triggerSearch();
			})
			.catch((err) => console.log(err));
	};

	const resetPassword = async () => {
		const token = await getAccessTokenSilently();
		const options = {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};
		fetch(`${process.env.API_URL}/users/reset-password/${user.email}`, options)
			.then((res) => res.json())
			.then(() => {
				toast({
					title: "User Password Reset",
					description: "User password has been reset",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<Tr>
			<Td>
				{user.blocked === true ? (
					<Tooltip label="User is blocked">
						<NotAllowedIcon color="red.200" />
					</Tooltip>
				) : (
					<Tooltip label="User is active">
						<CheckCircleIcon color="green.200" label="User is active" />
					</Tooltip>
				)}
			</Td>
			<Td>{user.full_name}</Td>
			<Td>{user.email}</Td>
			<Td>
				<Stack direction="column">
					{user.roles.map((roleId) => {
						if (!roleId) {
							return null;
						}
						return (
							<Checkbox
								key={`${roleId}-${user.user_id}`}
								disabled
								defaultChecked
							>
								{roles.find((role) => role.id === roleId).name}
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
						{user.blocked === true ? (
							<MenuItem
								icon={<UnlockIcon />}
								onClick={() => updateUserStatus(false)}
							>
								Unblock User
							</MenuItem>
						) : (
							<MenuItem
								icon={<CloseIcon />}
								onClick={() => updateUserStatus(true)}
							>
								Block User
							</MenuItem>
						)}
						<MenuItem icon={<RepeatClockIcon />} onClick={resetPassword}>
							Reset Password
						</MenuItem>
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

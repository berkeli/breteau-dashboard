import { useAuth0 } from "@auth0/auth0-react";
import { AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
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
	Td,
	Text,
	Tr,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import EditInitiative from "./EditInitiative";

const InitiativeRow = ({ initiative, triggerSearch, categories }) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const { name, category, description, created_at } = initiative;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deleteInitiative = async () => {
		const token = await getAccessTokenSilently();
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(
			`${process.env.API_URL}/initiatives/${initiative.id}`,
			options
		);
		if (response.ok) {
			triggerSearch();
			toast({
				title: "Initiative Deleted",
				description: `Initiative ${initiative.name} has been deleted`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} else {
			const data = await response.json();
			toast({
				title: "Error",
				description: data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};
	return (
		<Tr>
			<Td>{name}</Td>
			<Td>{category}</Td>
			<Td>
				<Text noOfLines={[1, 2, 3]}>{description}</Text>
			</Td>
			<Td>{new Date(created_at).toLocaleString()}</Td>
			<Td>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<AddIcon />}
						variant="outline"
					/>
					<MenuList>
						<MenuItem icon={<EditIcon />} onClick={onOpen}>
							Edit Initiative
						</MenuItem>
						<MenuItem icon={<CloseIcon />} onClick={deleteInitiative}>
							Delete Initiative
						</MenuItem>
					</MenuList>
				</Menu>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent p={2}>
						<ModalHeader> Edit Initiative </ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<EditInitiative
								triggerSearch={triggerSearch}
								onClose={onClose}
								categories={categories}
								initiative={initiative}
							/>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Td>
		</Tr>
	);
};

export default InitiativeRow;

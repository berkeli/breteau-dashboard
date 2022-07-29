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
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import EditSchool from "./EditSchool";

const SetupMenuColumn = ({
	triggerSearch,
	countries,
	statuses,
	persons,
	schoolData,
}) => {
	const toast = useToast();
	const { getAccessTokenSilently } = useAuth0();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const deleteSchool = async () => {
		const token = await getAccessTokenSilently();
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(
			`${process.env.API_URL}/schools/${schoolData.id}`,
			options
		);
		if (response.ok) {
			triggerSearch();
			toast({
				title: "School Deleted",
				description: `School ${schoolData.name} has been deleted`,
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
		<>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<AddIcon />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem icon={<EditIcon />} onClick={onOpen}>
						Edit School
					</MenuItem>
					<MenuItem icon={<CloseIcon />} onClick={deleteSchool}>
						Delete School
					</MenuItem>
				</MenuList>
			</Menu>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader> Edit School </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<EditSchool
							triggerSearch={triggerSearch}
							onClose={onClose}
							countries={countries}
							statuses={statuses}
							persons={persons}
							schoolData={schoolData}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SetupMenuColumn;

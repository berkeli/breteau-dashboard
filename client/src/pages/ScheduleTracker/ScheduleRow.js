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
	Tr,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import React from "react";
import EditSchedule from "./EditSchedule";
import useAuth0Roles from "../../hooks/useAuth0Roles";

const ScheduleRow = ({ schedule, triggerSearch, dropdownData }) => {
	const toast = useToast();
	const userRole = useAuth0Roles();
	const { getAccessTokenSilently, user } = useAuth0();
	const {
		full_name,
		school,
		initiative,
		duration,
		numofnewstudents,
		numofexistingstudents,
		numofnewteachers,
		numofexistingteachers,
		grades,
		languagestaught,
		totalnumtablets,
		supportcategory,
		supporttype,
	} = schedule;

	const deleteSchedule = async () => {
		const token = await getAccessTokenSilently();
		const options = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(
			`${process.env.API_URL}/schedule-tracker/${schedule.id}`,
			options
		);
		if (response.ok) {
			triggerSearch();
			toast({
				title: "Schedule Deleted",
				description: "Schedule has been deleted successfully",
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

	const ownedByCurrentUser =
		user.sub === schedule.created_by_auth0_id ||
		user.sub === schedule.delivered_by_auth0_id;

	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Tr>
			<Td>{full_name}</Td>
			<Td>{school}</Td>
			<Td>{initiative}</Td>
			<Td>{duration}</Td>
			<Td>{numofnewteachers}</Td>
			<Td>{numofnewstudents}</Td>
			<Td>{numofexistingteachers}</Td>
			<Td>{numofexistingstudents}</Td>
			<Td>{totalnumtablets}</Td>
			<Td>{grades}</Td>
			<Td>{languagestaught}</Td>
			<Td>{supportcategory}</Td>
			<Td>{supporttype}</Td>
			<Td>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<AddIcon />}
						variant="outline"
					/>
					<MenuList>
						<MenuItem
							icon={<EditIcon />}
							onClick={onOpen}
							isDisabled={!ownedByCurrentUser && !userRole.isAdmin}
						>
							Edit Schedule
						</MenuItem>
						<MenuItem
							icon={<CloseIcon />}
							onClick={deleteSchedule}
							isDisabled={!ownedByCurrentUser && !userRole.isAdmin}
						>
							Delete Schedule
						</MenuItem>
					</MenuList>
				</Menu>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent p={2}>
						<ModalHeader> Edit Schedule </ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<EditSchedule
								triggerSearch={triggerSearch}
								onClose={onClose}
								dropdownData={dropdownData.data}
								schedule={schedule}
							/>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Td>
		</Tr>
	);
};

export default ScheduleRow;

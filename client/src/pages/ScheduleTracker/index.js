import React, { useState } from "react";
import ScheduleRow from "./ScheduleRow";
import CreateSchedule from "./CreateSchedule";

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
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import { BiSearchAlt } from "react-icons/bi";
import useFetch from "../../hooks/useFetch";

import Loading from "../../components/Loading";

const ScheduleTracker = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQ, setDebouncedQ] = useState("");

	const {
		data: schedules,
		isLoading,
		error,
		triggerSearch,
	} = useFetch(`/schedule-tracker?searchQuery=${debouncedQ}`);

	//users, schools, initiatives for dropdown;

	const dropdownData = useFetch("/schedule-tracker/form-data");

	const fetchLatest = () => {
		triggerSearch();
	};

	return (
		<>
			<ActionsBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setDebouncedQ={setDebouncedQ}
				triggerSearch={fetchLatest}
				dropdownData={dropdownData.data}
			/>

			<Box>
				{isLoading && <Loading />}
				{error && (
					<Text align="center">
						Something went wrong... <br />
						{error.message}
					</Text>
				)}
				{schedules && (
					<Table variant="striped" size="sm">
						<Thead>
							<Tr>
								<Th>School</Th>
								<Th>Initiative</Th>
								<Th>New Students Reached</Th>
								<Th>Existing Students Reached</Th>
							</Tr>
						</Thead>
						<Tbody>
							{schedules.map((schedule) => (
								<ScheduleRow key={schedule.id} schedule={schedule} />
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
	dropdownData,
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
					placeholder="Search initiatives..."
					value={searchQuery}
					width="auto"
					onChange={handleChange}
				/>
			</InputGroup>
			<Button onClick={onOpen}>Create Initiative</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader> Create a new Initiative </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CreateSchedule
							triggerSearch={triggerSearch}
							onClose={onClose}
							dropdownData={dropdownData}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default ScheduleTracker;

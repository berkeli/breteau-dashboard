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
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import { BiSearchAlt } from "react-icons/bi";
import useFetch from "../../hooks/useFetch";
import CreateInitiative from "./CreateInitiative";
import Loading from "../../components/Loading";
import InitiativeRow from "./InitiativeRow";

const Projects = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQ, setDebouncedQ] = useState("");

	const {
		data: initiatives,
		isLoading,
		error,
		triggerSearch,
	} = useFetch(`/initiatives?searchQuery=${debouncedQ}`);

	const areas = useFetch("/initiatives/areas");

	const fetchLatest = () => {
		triggerSearch();
		areas.triggerSearch();
	};

	return (
		<>
			<ActionsBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setDebouncedQ={setDebouncedQ}
				triggerSearch={fetchLatest}
				areas={areas.data}
			/>

			<Box>
				{isLoading && <Loading />}
				{error && (
					<Text align="center">
						Something went wrong... <br />
						{error.message}
					</Text>
				)}
				{initiatives && (
					<Table variant="striped">
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Area</Th>
								<Th>Description</Th>
								<Th>Created At</Th>
							</Tr>
						</Thead>
						<Tbody>
							{initiatives.map((initiative) => (
								<InitiativeRow key={initiative.id} initiative={initiative} />
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
	areas,
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
						<CreateInitiative
							triggerSearch={triggerSearch}
							onClose={onClose}
							areas={areas}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default Projects;

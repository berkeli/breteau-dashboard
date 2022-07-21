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
import CreateSchoolStat from "./CreateSchoolStat";
import Loading from "../../components/Loading";
import SchoolStatRow from "./SchoolStatRow";

const SchoolStats = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQ, setDebouncedQ] = useState("");

	const {
		data: schoolstats,
		isLoading,
		error,
		triggerSearch,
	} = useFetch(`/schoolstats?searchQuery=${debouncedQ}`);

	const countries = useFetch("/schoolstats/countries");

	const fetchLatest = () => {
		triggerSearch();
		countries.triggerSearch();
	};

	return (
		<>
			<ActionsBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setDebouncedQ={setDebouncedQ}
				triggerSearch={fetchLatest}
				countries={countries.data}
			/>

			<Box>
				{isLoading && <Loading />}
				{error && (
					<Text align="center">
						Something went wrong... <br />
						{error.message}
					</Text>
				)}
				{schoolstats && (
					<Table variant="striped">
						<Thead>
							<Tr>
								<Th>Country</Th>
								<Th>Name</Th>
								<Th>Country</Th>
								<Th>Person Responsible</Th>
								<Th>Status</Th>
								<Th>Deployment Date</Th>
								<Th>Created At</Th>
							</Tr>
						</Thead>
						<Tbody>
							{schoolstats.map((element) => (
								<SchoolStatRow key={element.id} schoolstat={element} />
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
	countries,
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
					placeholder="Search schoolstats..."
					value={searchQuery}
					width="auto"
					onChange={handleChange}
				/>
			</InputGroup>
			<Button onClick={onOpen}>Create School Stat</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader> Create a new School Stat </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CreateSchoolStat
							triggerSearch={triggerSearch}
							onClose={onClose}
							countries={countries}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default SchoolStats;

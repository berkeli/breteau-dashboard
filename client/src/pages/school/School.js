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
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import { BiSearchAlt } from "react-icons/bi";
import useFetch from "../../hooks/useFetch";
import CreateSchool from "./CreateSchool";
import Loading from "../../components/Loading";
import CreateReactTableForSchool from "./CreateReactTableForSchool";

const School = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQ, setDebouncedQ] = useState("");

	const {
		data: schoolData,
		isLoading,
		error,
		triggerSearch,
	} = useFetch(`/schools?searchQuery=${debouncedQ}`);

	const countries = useFetch("/schools/countries");
	const statuses = useFetch("/schools/statuses");

	const fetchLatest = () => {
		triggerSearch();
		countries.triggerSearch();
		statuses.triggerSearch();
	};

	return (
		<>
			<ActionsBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setDebouncedQ={setDebouncedQ}
				triggerSearch={fetchLatest}
				countries={countries.data}
				statuses={statuses.data}
			/>

			<Box>
				{isLoading && <Loading />}
				{error && (
					<Text align="center">
						Something went wrong... <br />
						{error.message}
					</Text>
				)}
				{/* Implemented as a React Table*/}
				{schoolData && (
					<CreateReactTableForSchool
						schoolData={schoolData}
					></CreateReactTableForSchool>
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
	statuses,
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
					placeholder="Search schools..."
					value={searchQuery}
					width="auto"
					onChange={handleChange}
				/>
			</InputGroup>
			<Button onClick={onOpen}>Create School</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent p={2}>
					<ModalHeader> Create a new School </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<CreateSchool
							triggerSearch={triggerSearch}
							onClose={onClose}
							countries={countries}
							statuses={statuses}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default School;

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

let sortedPersons;



const checkPersons = (persons) => {


		// Just in case, check that all persons have been retrieved correctly
		if (!persons || !persons.length) {
			// Hopefully, this should never happen!
			return { jsx:(
				<Text align="center">
					Something went wrong... <br />
					No users have been found!
				</Text>
			) };
		} else {
			// display the names in alphabetical order in the drop down list
			sortedPersons = persons
				.map((element) => ({
					name: element.full_name,
				}))
				.sort(function (a, z) {
					return a.name.localeCompare(z.name);
				});
			return { sorted: true };
		}
};


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
const persons = useFetch("/");

const fetchLatest = () => {
		triggerSearch();
		countries.triggerSearch();
		statuses.triggerSearch();
		persons.triggerSearch();
	};

	console.log(schoolData)
	console.log(countries)
	console.log(persons)
	console.log(fetchLatest);
	console.log(persons)
	// Just in case, check that all persons have been retrieved correctly
	if (!persons || !persons.data) {
			return ( <Loading /> );
	}

	// Hopefully, this should never happen!
	if (!persons.data.length) {
			return (
				<Text align="center">
					Something went wrong... <br />
					No users have been found!
				</Text>
			);
		} else {
			// display the names in alphabetical order in the drop down list
			sortedPersons = persons.data
				.map((element) => ({
					name: element.full_name,
				}))
				.sort(function (a, z) {
					return a.name.localeCompare(z.name);
				});
		}

	return (
		<>
			<ActionsBox
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setDebouncedQ={setDebouncedQ}
				triggerSearch={fetchLatest}
				countries={countries.data}
				statuses={statuses.data}
				persons={sortedPersons}
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
						triggerSearch={triggerSearch}
						countries={countries}
						statuses={statuses}
						persons={sortedPersons}
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
	persons,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleChange = (e) => {
		setSearchQuery(e.target.value);
		const debounce = _.debounce(() => setDebouncedQ(e.target.value), 500);
		debounce();
	};

	console.log(persons)
/*
	// Just in case, check that all persons have been retrieved correctly
	if (!persons || !persons.length) {
		return (
			<Text align="center">
				Something went wrong... <br />
				No users have been found!
			</Text>
		);
//		return (<Loading />);
	} else {

		// display the names in alphabetical order in the drop down list
		sortedPersons = persons
			.map((element) => ({
				name: element.full_name,
			}))
			.sort(function (a, z) {
				return a.name.localeCompare(z.name);
			});
			console.log(sortedPersons);
	}
*/

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
							persons={persons}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default School;

import { Table, Thead, Tr, Th, TableContainer, TableCaption,
			Text, Box } from "@chakra-ui/react";
import DisplayRows from "./DisplayRows.js";

const DisplayTable = ({ countryNames, schoolData }) => {

	const listOfTables = countryNames.map((aCountry) => (
		<TableContainer key={aCountry}>
			<Table size="lg">
				<TableCaption placement="top">
					<Box background="cyan.400" width="100%" padding={1} color="white">
						<Text fontSize="4xl">{aCountry}</Text>
					</Box>
				</TableCaption>
				<Thead>
					<Tr>
						<Th className="title-style">
							<span>School</span>
							<span>Name</span>
						</Th>
						<Th className="title-style">Location</Th>
						<Th className="title-style">
							<span>Person</span>
							<span>Responsible</span>
						</Th>
						<Th className="title-style">
							<span>Current</span>
							<span>Status</span>
						</Th>
						<Th isNumeric className="title-style">
							<span>Deployment</span>
							<span>Year</span>
						</Th>
					</Tr>
				</Thead>
				<DisplayRows
					countryName={aCountry}
					schoolData={schoolData}
				></DisplayRows>
			</Table>
		</TableContainer>
	));
	return <div>{listOfTables}</div>;
};

export default DisplayTable;
import { Table, Thead, Tfoot, Tr, Th, TableContainer } from "@chakra-ui/react";
import DisplayRows from "./DisplayRows.js";

const DisplayTable = ({ countryName, schoolData }) => {
  return (
	<TableContainer>
		<Table size="lg">
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
				countryName={countryName}
				schoolData={schoolData}
			>
			</DisplayRows>

			<Tfoot>
				<Tr>
					<Th>&nbsp;</Th>
					<Th>&nbsp;</Th>
					<Th>&nbsp;</Th>
					<Th>&nbsp;</Th>
					<Th>&nbsp;</Th>
				</Tr>
			</Tfoot>
		</Table>
	</TableContainer>
  );
};

export default DisplayTable;
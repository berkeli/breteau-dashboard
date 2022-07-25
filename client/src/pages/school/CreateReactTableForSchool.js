import React from "react";
import { useTable, useSortBy } from "react-table";
import { Table, Tbody, Th, Thead, Tr, Td, chakra } from "@chakra-ui/react";
import processSchoolRow from "./processSchoolRow";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const CreateReactTableForSchool = ({ schoolData }) => {
	// Prepare the data for React Table
	const reactTableColumns = React.useMemo(
		() => [
			{
				Header: "Country",
				accessor: "country", // accessor is the "key" in the data
			},
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Location",
				accessor: "location",
			},
			{
				Header: "Description",
				accessor: "description",
			},
			{
				Header: "Person Responsible",
				accessor: "full_name",
			},
			{
				Header: "Status",
				accessor: "status",
			},
			{
				Header: "Deployment Date",
				accessor: "deploymentdate",
				sortType: (a, z) => {
					return (
						a.values.deploymentdate_sortvalue -
						z.values.deploymentdate_sortvalue
					);
				},
			},
			{
				Header: "hidedate", // for sorting purposes only - see above
				accessor: "deploymentdate_sortvalue",
				isVisible: true,
			},
			{
				Header: "Created At",
				accessor: "created_at",
			},
		],
		[]
	);

	const reactTableData = React.useMemo(
		() => schoolData.map((element) => processSchoolRow(element)),
		[schoolData]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setHiddenColumns,
	} = useTable(
		{
			columns: reactTableColumns,
			data: reactTableData,
			hiddenColumns: reactTableColumns
				.filter((column) => !column.isVisible)
				.map((column) => column.accessor),
		},
		useSortBy
	);

	// According to the confusing React-Table documentation, this is the only way to hide a column
	// See @ggascoigne AT https://github.com/TanStack/table/issues/1804
	// https://codesandbox.io/s/relaxed-night-y5gcl?file=/src/App.js:980-985

	React.useEffect(() => {
		setHiddenColumns(
			reactTableColumns
				.filter((column) => column.isVisible)
				.map((column) => column.accessor)
		);
	}, [setHiddenColumns, reactTableColumns]);
	return (
		<Table variant="striped" {...getTableProps()}>
			<Thead>
				{headerGroups.map((headerGroup, index) => (
					<Tr key={index} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<Th
								key={index}
								{...column.getHeaderProps(column.getSortByToggleProps())}
							>
								{column.render("Header")}
								<chakra.span pl="4">
									{column.isSorted ? (
										column.isSortedDesc ? (
											<TriangleDownIcon aria-label="sorted descending" />
										) : (
											<TriangleUpIcon aria-label="sorted ascending" />
										)
									) : null}
								</chakra.span>
							</Th>
						))}
					</Tr>
				))}
			</Thead>
			<Tbody {...getTableBodyProps()}>
				{rows.map((row, index) => {
					prepareRow(row);
					return (
						<Tr key={index} {...row.getRowProps()}>
							{row.cells.map((cell, index) => (
								<Td key={index} {...cell.getCellProps()}>
									{cell.render("Cell")}
								</Td>
							))}
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default CreateReactTableForSchool;

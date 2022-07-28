import {
	Center,
	Heading,
	SimpleGrid,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React from "react";
import StatsCard from "../../components/home/StatsCard";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";

const ExpandedRow = ({ initiative }) => {
	const { data, isLoading, error } = useFetch(`/initiatives/${initiative.id}`);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return (
			<Center>
				Something went wrong... <br />
				{error.message}
			</Center>
		);
	}

	const stats = {
		new_teachers: 0,
		new_students: 0,
		existing_students: 0,
		existing_teachers: 0,
		countries: new Set(),
		schools: new Set(),
	};

	data.forEach((e) => {
		stats.new_teachers += e.new_teachers;
		stats.new_students += e.new_students;
		stats.existing_students += e.existing_students;
		stats.existing_teachers += e.existing_teachers;
		stats.countries.add(e.country);
		stats.schools.add(e.school);
	});

	return (
		<>
			<Heading as="h2" fontSize="2xl" mt={3} textAlign="center">
				Overall Stats
			</Heading>
			<SimpleGrid
				columns={{ base: 2, md: 3 }}
				gap={{ base: "5", md: "6" }}
				mt={3}
			>
				<StatsCard title="New Students Reached" stat={stats.new_students} />
				<StatsCard
					title="Existing Students Reached"
					stat={stats.existing_students}
				/>
				<StatsCard title="New Teachers Reached" stat={stats.new_teachers} />
				<StatsCard
					title="Existing Teachers Reached"
					stat={stats.existing_teachers}
				/>
				<StatsCard title="Number of Countries" stat={stats.countries.size} />
				<StatsCard title="Number of Schools" stat={stats.schools.size} />
			</SimpleGrid>
			<Heading as="h2" fontSize="2xl" mt={6} textAlign="center">
				Recent Surveys
			</Heading>
			<Table variant="" size="sm" mt={6}>
				<Thead>
					<Tr>
						<Th>School</Th>
						<Th>Country</Th>
						<Th>Duration</Th>
						<Th>Number of new Students</Th>
						<Th>Number of existing Students</Th>
						<Th>Number of new Teachers</Th>
						<Th>Number of existing Teachers</Th>
						<Th>Tablets</Th>
						<Th>Created At</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((e) => (
						<ScheduleTrackerRow key={`st-${e.id}`} schedule={e} />
					))}
				</Tbody>
			</Table>
		</>
	);
};

const ScheduleTrackerRow = ({ schedule }) => {
	return (
		<Tr>
			<Td>{schedule.name}</Td>
			<Td>{schedule.country}</Td>
			<Td>{schedule.duration}</Td>
			<Td>{schedule.new_students}</Td>
			<Td>{schedule.existing_students}</Td>
			<Td>{schedule.new_teachers}</Td>
			<Td>{schedule.existing_teachers}</Td>
			<Td>{schedule.tablets}</Td>
			<Td>{new Date(schedule.created_at).toLocaleDateString()}</Td>
		</Tr>
	);
};

export default ExpandedRow;

import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Loading from "../../components/Loading";
import monthName from "../../utils/monthName";

const CreateLineChart = ({ data, title, isLoading }) => {
	const borderColor = useColorModeValue("gray.800", "gray.500");
	if (isLoading) {
		return <Loading />;
	}
	const key = title === "Students" ? "students" : "teachers";

	let max = 0;

	const chartData = data.map((item) => {
		max = Math.max(item[`existing_${key}`], item[`existing_${key}`]);
		return {
			name: monthName(item.month),
			[`existing_${key}`]: item[`existing_${key}`],
			[`new_${key}`]: item[`new_${key}`],
		};
	});

	const lineLabel = (entry) => {
		return entry.name;
	};
	return (
		<Box
			minH={330}
			maxH={350}
			py={2}
			mt="2rem"
			shadow={"xl"}
			border={"1px solid"}
			borderColor={borderColor}
			rounded={"md"}
		>
			<Text as="h2" textAlign="center" size="md" my="2">
				{`${title} Reach`}
			</Text>
			<ResponsiveContainer width="100%" height="90%">
				<LineChart
					width={500}
					height={300}
					data={chartData}
					margin={{
						top: 5,
						right: 30,
						left: 5,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 4" />
					<XAxis dataKey="name" />
					<YAxis domain={[0, max]} />
					<Tooltip />
					<Legend />
					<Line
						name="Existing"
						type="monotone"
						dataKey={`existing_${key}`}
						label={lineLabel}
						stroke="#8884d8"
					/>
					<Line
						name="New"
						type="monotone"
						dataKey={`new_${key}`}
						stroke="#82ca9d"
					/>
				</LineChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default CreateLineChart;

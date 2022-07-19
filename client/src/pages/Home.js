import { SimpleGrid } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { IoMdSchool } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import StatsCard from "../components/home/StatsCard";
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

const stats = {
	total: {
		students: 300,
		schools: 30,
		teachers: 30,
		initiatives: 30,
	},
	timeline: {
		students: [
			{
				date: "2020-01-01",
				count: 300,
			},
			{
				date: "2020-02-01",
				count: 300,
			},
		],
		schools: [
			{
				date: "2020-01-01",
				count: 300,
			},
			{
				date: "2020-02-01",
				count: 300,
			},
		],
	},
};

const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

export function Home() {
	return (
		<>
			<SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
				<StatsCard
					title={"Students"}
					stat={stats.total.students}
					icon={<BsPerson size={"3em"} />}
				/>
				<StatsCard
					title={"Teachers"}
					stat={stats.total.teachers}
					icon={<GiTeacher size={"3em"} />}
				/>
				<StatsCard
					title={"Schools"}
					stat={stats.total.teachers}
					icon={<IoMdSchool size={"3em"} />}
				/>
				<StatsCard
					title={"Countries"}
					stat={"7"}
					icon={<GoLocation size={"3em"} />}
				/>
			</SimpleGrid>
			<SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
				<ResponsiveContainer width="500px" height="300px">
					<LineChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="pv"
							stroke="#8884d8"
							activeDot={{ r: 8 }}
						/>
						<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
					</LineChart>
				</ResponsiveContainer>
			</SimpleGrid>
		</>
	);
}

export default Home;

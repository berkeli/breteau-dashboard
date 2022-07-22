import { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { IoMdSchool } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import StatsCard from "../../components/home/StatsCard";
import CreateLineChart from "./CreateLineChart";
import MapChart from "./MapChart";
import useFetch from "../../hooks/useFetch";
import ReactTooltip from "react-tooltip";

export function Home() {
	const totals = useFetch("/stats/totals");
	const reach = useFetch("/stats/reach");
	const countries = useFetch("/stats/countries");
	const [content, setContent] = useState("");
	return (
		<>
			{!totals.error && (
				<SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
					<StatsCard
						title={"Students"}
						stat={totals.data?.students}
						isLoading={totals.isLoading}
						icon={<BsPerson size={"3em"} />}
					/>
					<StatsCard
						title={"Teachers"}
						stat={totals.data?.teachers}
						isLoading={totals.isLoading}
						icon={<GiTeacher size={"3em"} />}
					/>
					<StatsCard
						title={"Schools"}
						stat={totals.data?.schools}
						isLoading={totals.isLoading}
						icon={<IoMdSchool size={"3em"} />}
					/>
					<StatsCard
						title={"Countries"}
						stat={totals.data?.countries}
						isLoading={totals.isLoading}
						icon={<GoLocation size={"3em"} />}
					/>
				</SimpleGrid>
			)}
			{!reach.error && (
				<SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
					<CreateLineChart
						data={reach.data}
						title="Students"
						isLoading={reach.isLoading}
					/>
					<CreateLineChart
						data={reach.data}
						title="Teachers"
						isLoading={reach.isLoading}
					/>
				</SimpleGrid>
			)}
			{!countries.error && countries.data && (
				<Box as="div" mt={4}>
					<MapChart setTooltipContent={setContent} countries={countries.data} />
					<ReactTooltip>{content} </ReactTooltip>
				</Box>
			)}
		</>
	);
}

export default Home;

import { useState } from "react";
import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import CreateLineChart from "./CreateLineChart";
import MapChart from "./MapChart";
import useFetch from "../../hooks/useFetch";
import ReactTooltip from "react-tooltip";
import TotalCards from "./TotalCards";

export function Home() {
	const reach = useFetch("/stats/reach");
	const countries = useFetch("/stats/countries");
	const [content, setContent] = useState("");
	const borderColor = useColorModeValue("gray.800", "gray.500");
	return (
		<>
			<TotalCards />
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
				<Box
					py={2}
					mt="2rem"
					shadow={"xl"}
					border={"1px solid"}
					rounded={"md"}
					borderColor={borderColor}
				>
					<MapChart setTooltipContent={setContent} countries={countries.data} />
					<ReactTooltip>{content}</ReactTooltip>
				</Box>
			)}
		</>
	);
}

export default Home;

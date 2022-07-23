import { Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { BsPerson } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { IoMdSchool } from "react-icons/io";
import StatsCard from "../../components/home/StatsCard";
import useFetch from "../../hooks/useFetch";

const TotalCards = () => {
	const { data: totals, isLoading, error } = useFetch("/stats/totals");
	if (error) {
		return (
			<Center>
				Something went wront <br />
				{error}
			</Center>
		);
	}
	return (
		<SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
			<StatsCard
				title={"Students"}
				stat={totals?.students}
				isLoading={isLoading}
				icon={<BsPerson size={"3em"} />}
			/>
			<StatsCard
				title={"Teachers"}
				stat={totals?.teachers}
				isLoading={isLoading}
				icon={<GiTeacher size={"3em"} />}
			/>
			<StatsCard
				title={"Schools"}
				stat={totals?.schools}
				isLoading={isLoading}
				icon={<IoMdSchool size={"3em"} />}
			/>
			<StatsCard
				title={"Countries"}
				stat={totals?.countries}
				isLoading={isLoading}
				icon={<GoLocation size={"3em"} />}
			/>
		</SimpleGrid>
	);
};

export default TotalCards;

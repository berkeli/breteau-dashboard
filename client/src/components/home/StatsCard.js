import {
	Box,
	Flex,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from "@chakra-ui/react";
import Loading from "../Loading";

const StatsCard = (props) => {
	const { title, stat, icon, isLoading } = props;
	const borderColor = useColorModeValue("gray.800", "gray.500");
	return (
		<Stat
			px={{ base: 2, md: 4 }}
			py={"5"}
			shadow={"xl"}
			border={"1px solid"}
			borderColor={borderColor}
			rounded={"lg"}
		>
			{isLoading ? (
				<Loading />
			) : (
				<Flex justifyContent={"space-between"}>
					<Box pl={{ base: 2, md: 4 }}>
						<StatLabel fontWeight={"medium"}>{title}</StatLabel>
						<StatNumber fontSize={"2xl"} fontWeight={"medium"}>
							{stat}
						</StatNumber>
					</Box>
					<Box my={"auto"} color={borderColor} alignContent={"center"}>
						{icon}
					</Box>
				</Flex>
			)}
		</Stat>
	);
};

export default StatsCard;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
	Button,
	Flex,
	Image,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import Logo from "../assets/breteau_logo.png";

const LoginPage = () => {
	const { loginWithRedirect } = useAuth0();
	const containerBg = useColorModeValue("teal.200", "teal.300");
	return (
		<VStack alignItems="center" justifyContent="center" minH="80vh">
			<Flex
				flexDirection="column"
				alignItems="center"
				bgColor={containerBg}
				px="2rem"
				py="1rem"
				borderRadius="2xl"
				shadow="2xl"
			>
				<Image src={Logo} mb="10" width={["70vw", "50vw", "30vw", "20vw"]} />
				<Button
					onClick={() =>
						loginWithRedirect({
							appState: {
								returnTo: window.location.pathname, // here
							},
						})
					}
					size="lg"
					colorScheme="blue"
				>
					Login
				</Button>
			</Flex>
		</VStack>
	);
};

export default LoginPage;

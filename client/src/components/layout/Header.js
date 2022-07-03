import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Flex } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
	const { logout } = useAuth0();
	return (
		<Flex as="header" width="full" align="center">
			<Box as="h1" fontSize="2xl" fontWeight="bold">
				My app
			</Box>
			<Box marginLeft="auto">
				<ThemeToggle />
				<Button ml="2" onClick={() => logout()}> Logout </Button>
			</Box>
		</Flex>
	);
};

export default Header;

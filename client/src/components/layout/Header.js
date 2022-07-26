import { useAuth0 } from "@auth0/auth0-react";
import {
	Box,
	Button,
	Flex,
	HStack,
	IconButton,
	Link,
	Stack,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import useAuth0Roles from "../../hooks/useAuth0Roles";

const NavLink = ({ to, children }) => {
	const bg = useColorModeValue("gray.200", "gray.700");
	return (
		<Link
			px={2}
			py={1}
			as={RouterLink}
			to={to}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg,
			}}
		>
			{children}
		</Link>
	);
};

const Header = () => {
	const { logout } = useAuth0();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = useAuth0Roles();
	const navLinks = [
		{ name: "Schools", to: "/schools", role: "isCountryManager" },
		{ name: "Initiatives", to: "/initiatives", role: "isAdmin" },
		{ name: "Users", to: "/users", role: "isSuperAdmin" },
	];
	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<NavLink as={RouterLink} to="/">
							Breteau
						</NavLink>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{navLinks.map((link) => {
								if (user[link.role]) {
									return (
										<NavLink as={RouterLink} key={link.to} to={link.to}>
											{link.name}
										</NavLink>
									);
								} else {
									return null;
								}
							})}
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<ThemeToggle />
						<Button ml="2" onClick={() => logout()}>
							Logout
						</Button>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{navLinks.map((link) => (
								<NavLink key={link} to={link.to}>
									{link.name}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
};

export default Header;

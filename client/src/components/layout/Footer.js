import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Flex
			as="footer"
			width="full"
			align="center"
			justifyContent="center"
			bottom="0"
		>
			<Text>
				{new Date().getFullYear()} - Developed by
				<Link
					href="https://github.com/berkeli/breteau-dashboard"
					isExternal
					rel="noopener noreferrer"
				>
					&nbsp;Team Ashgabat
				</Link>
				<Text>
					Courtesy of{" "}
					<Link
						href="https://codeyourfuture.io/"
						isExternal
						rel="noopener noreferrer"
					>
						&nbsp;CodeYourFuture
					</Link>
				</Text>
			</Text>
		</Flex>
	);
};

export default Footer;

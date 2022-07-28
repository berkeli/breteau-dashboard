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
				<Link href="https://google.com" isExternal rel="noopener noreferrer">
					&nbsp;Team Ashgabat
				</Link>
				<Text>
					courtesy of
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

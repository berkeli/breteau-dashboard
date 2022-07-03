import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Image, VStack } from "@chakra-ui/react";

const LoginPage = () => {
	const { loginWithPopup } = useAuth0();
	return (
		<VStack alignItems="center" justifyContent="center" minH="80vh">
			<Image
				src="https://www.breteaufoundation.org/wp-content/uploads/thegem-logos/logo_321f1ba5aee6fd961a7217c2dd66f313_2x.png"
				mb="10"
			/>
			<Button onClick={() => loginWithPopup()} size="lg">
				Login
			</Button>
		</VStack>
	);
};

export default LoginPage;

import { useAuth0 } from "@auth0/auth0-react";

const useAuth0Roles = () => {
	const { user } = useAuth0();
	return {
		isSuperAdmin:
			user && user["http://breteau.com/roles"].includes("Super Admin"),
		isAdmin: user && user["http://breteau.com/roles"].includes("Admin"),
		isCountryManager:
			user && user["http://breteau.com/roles"].includes("Country Manager"),
	};
};

export default useAuth0Roles;

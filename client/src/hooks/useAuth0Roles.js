import { useAuth0 } from "@auth0/auth0-react";

const useAuth0Roles = () => {
	const { user } = useAuth0();
	const isSuperAdmin =
		user && user["http://breteau.com/roles"].includes("Super Admin");
	const isAdmin =
		isSuperAdmin ||
		(user && user["http://breteau.com/roles"].includes("Admin"));
	const isCountryManager =
		isSuperAdmin ||
		isAdmin ||
		(user && user["http://breteau.com/roles"].includes("Country Manager"));

	return {
		isSuperAdmin,
		isAdmin,
		isCountryManager,
	};
};

export default useAuth0Roles;

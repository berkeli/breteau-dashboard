import jwt_decode from "jwt-decode";

export const getUserPermissions = (req) => {
	const token = req.headers.authorization.split(" ")[1];
	const decoded = jwt_decode(token);

	return decoded.permissions;
};

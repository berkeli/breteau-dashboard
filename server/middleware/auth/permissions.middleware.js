import jwt_decode from "jwt-decode";

export const checkPermissions = (permissions) => {
	return (req, res, next) => {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt_decode(token);
		if (decoded.permissions && decoded.permissions.includes(permissions)) {
			next();
		} else {
			res.status(403).json({
				message: "Forbidden",
			});
		}
	};
};

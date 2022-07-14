import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import config from "../../config";

export const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 6,
		jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`,
	}),

	// Validate the audience and the issuer.
	audience: "breteau-api",
	algorithms: ["RS256"],
});

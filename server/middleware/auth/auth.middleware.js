import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();

const authConfig = {
	domain: process.env.AUTH0_DOMAIN,
	audience: process.env.AUTH0_AUDIENCE,
	clientId: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	algorithms: ["RS256"],
};

export const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${authConfig.domain}/.well-known/jwks.json`,
	}),

	// Validate the audience and the issuer.
	audience: authConfig.audience,
	issuer: `${authConfig.domain}/`,
	algorithms: authConfig.algorithms,
});

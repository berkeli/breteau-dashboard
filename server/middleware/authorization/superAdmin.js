import JwksRsa from "jwks-rsa";

const authorizeAccessToken = jwt({
	secret: JwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
	}),
	audience: authConfig.audience,
	issuer: `https://${authConfig.domain}/`,
	algorithms: ["RS256"],
});

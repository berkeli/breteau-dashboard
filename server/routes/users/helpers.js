import { ManagementClient, AuthenticationClient } from "auth0";
import config from "../../config";

export const auth0 = new ManagementClient({
	domain: config.AUTH0_DOMAIN,
	clientId: config.AUTH0_CLIENT_ID,
	clientSecret: config.AUTH0_CLIENT_SECRET,
});

export const AuthClient = new AuthenticationClient({
	domain: config.AUTH0_DOMAIN,
	clientId: config.AUTH0_CLIENT_ID,
	clientSecret: config.AUTH0_CLIENT_SECRET,
});

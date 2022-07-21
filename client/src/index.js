import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import history from "./utils/history";

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.returnTo ? appState.returnTo : window.location.pathname
	);
};

const providerConfig = {
	domain: process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_CLIENT_ID,
	redirectUri: window.location.origin,
	onRedirectCallback,
	audience: process.env.AUTH0_AUDIENCE,
	cacheLocation: "localstorage",
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<Auth0Provider {...providerConfig}>
		<BrowserRouter history={history}>
			<App />
		</BrowserRouter>
	</Auth0Provider>
);

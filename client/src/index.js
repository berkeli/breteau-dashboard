import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import history from "./utils/history";

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.returnTo ? appState.returnTo : window.location.pathname
	);
};

const asyncRender = async () => {
	const config = await fetch("/api/envconfig");
	const envConfig = await config.json();
	const providerConfig = {
		domain: envConfig.AUTH0_DOMAIN,
		clientId: envConfig.AUTH0_CLIENT_ID,
		redirectUri: window.location.origin,
		onRedirectCallback,
		audience: "http://localhost:3000/api",
	};

	ReactDOM.render(
		<Auth0Provider {...providerConfig}>
			<BrowserRouter history={history}>
				<App />
			</BrowserRouter>
		</Auth0Provider>,
		document.getElementById("root")
	);
};

asyncRender();

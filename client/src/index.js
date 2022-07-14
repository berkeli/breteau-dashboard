import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import history from "./utils/history";

const providerConfig = {
	domain: process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_CLIENT_ID,
	redirectUri: window.location.origin,
	audience: "breteau-api",
};

ReactDOM.render(
	<Auth0Provider {...providerConfig}>
		<BrowserRouter history={history}>
			<App />
		</BrowserRouter>
	</Auth0Provider>,
	document.getElementById("root")
);

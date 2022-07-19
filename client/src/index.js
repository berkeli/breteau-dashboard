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

const providerConfig = {
	domain: "ldn8-final-project.eu.auth0.com",
	clientId: "2pr8vVOpoLHDPeB83W12JEsqwZl4rkH2",
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

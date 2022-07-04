import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./Home.css";
import logo from "./logo.svg";

export function Home() {
	const { getAccessTokenSilently } = useAuth0();

	const [message, setMessage] = useState("Loading...");
	useEffect(() => {
		getAccessTokenSilently().then((token) => {
			fetch("/api", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.json();
				})
				.then((body) => {
					setMessage(body.message);
				})
				.catch((err) => {
					console.error(err);
				});
		});
	}, []);

	return (
		<main role="main">
			<div>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					{message}
				</h1>
				<Link to="/about/this/site">About</Link>
			</div>
		</main>
	);
}

export default Home;

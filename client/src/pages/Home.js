import { Link } from "react-router-dom";

export function Home() {
	return (
		<main role="main">
			<div>
				<h1 className="message" data-qa="message">
					Welcome to the React Auth0 Example
				</h1>
				<Link to="/about/this/site">About</Link>
			</div>
		</main>
	);
}

export default Home;

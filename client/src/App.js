import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { Chakra } from "./components/Chakra";

import Layout from "./components/layout";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import Home from "./pages/Home";
import CreateSchool from "./CreateSchool";

import Users from "./pages/users/Users";
import Initiatives from "./pages/initiative";

const App = () => {
	const { isLoading, error, isAuthenticated } = useAuth0();

	if (error) {
		return <div>Oops... {error.message}</div>;
	}

	if (isLoading) {
		return <Loading />;
	}
	return (
		<Chakra>
			{isLoading && <Loading />}
			{error && <div>Oops... {error.message}</div>}
			{isAuthenticated ? (
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/initiatives" element={<Initiatives />} />
						<Route path="/users" element={<Users />} />
						<Route path="/about/this/site" element={<About />} />
						<Route path="/createschool" element={<CreateSchool />} />
					</Routes>
				</Layout>
			) : (
				<LoginPage />
			)}
		</Chakra>
	);
};
export default App;

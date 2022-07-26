import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { Chakra } from "./components/Chakra";

import Layout from "./components/layout";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/home";
import Users from "./pages/users/";
import Initiatives from "./pages/initiative";
import Schools from "./pages/school/School";
import useAuth0Roles from "./hooks/useAuth0Roles";

const App = () => {
	const { isLoading, error, isAuthenticated } = useAuth0();
	const user = useAuth0Roles();
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
						{user.isSuperAdmin && <Route path="/users" element={<Users />} />}
						{user.isCountryManager && (
							<Route path="/schools" element={<Schools />} />
						)}
					</Routes>
				</Layout>
			) : (
				<LoginPage />
			)}
		</Chakra>
	);
};
export default App;

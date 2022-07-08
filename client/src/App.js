import { Route, Routes } from "react-router-dom";
import { Chakra } from "./components/Chakra";
import Layout from "./components/layout";

import About from "./pages/About";
import Home from "./pages/Home";
import DisplaySchools from "./pages/DisplaySchools";

const App = () => (
	<Chakra>
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about/this/site" element={<About />} />
				<Route path="/schools" element={<DisplaySchools />} />
			</Routes>
		</Layout>
	</Chakra>
);

export default App;

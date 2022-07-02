import { Box } from "@chakra-ui/react";

import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box margin="0 auto" maxWidth="100%" transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
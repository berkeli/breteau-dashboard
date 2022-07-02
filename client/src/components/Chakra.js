import { ChakraProvider, localStorageManager } from "@chakra-ui/react";

import customTheme from "../styles";

export const Chakra = ({ children }) => {
  return (
    <ChakraProvider colorModeManager={localStorageManager} theme={customTheme}>
      {children}
    </ChakraProvider>
  );
};
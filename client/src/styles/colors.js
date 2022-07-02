/** extend additional color here */
const extendedColors = {
  brand: {
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
};

/** override chakra colors here */
const overridenChakraColors = {};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

export default colors;
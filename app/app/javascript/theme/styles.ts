import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    brand: {
      100: "#cbceeb",
      200: "#a9aed6",
      300: "#888ec5",
      400: "#666db3",
      500: "#4d5499",
      600: "#3c4178",
      700: "#2a2f57",
      800: "#181c37",
      900: "#080819",
    },
  },
  styles: {
    global: props => ({
      body: {
        bg: mode("gray.50", "gray.800")(props),
        fontFamily: "Helvetica, sans-serif",
      },
      html: {
        fontFamily: "Helvetica, sans-serif",
      },
    }),
  },
};

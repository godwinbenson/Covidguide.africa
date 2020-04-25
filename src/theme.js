import { theme as ChakraTheme } from "@chakra-ui/core";
import { projectIcons } from "./icons";

export const customTheme = {
  ...ChakraTheme,
  fonts: {
    ...ChakraTheme.fonts,
    heading: "Circular, Helvetica, sans-serif",
    body: "Circular, Helvetica, sans-serif"
  },
  colors: {
    ...ChakraTheme.colors,
    green: {
      ...ChakraTheme.colors.green,
      500: "#61cb75"
    }
  },
  borderWidths: {
    xl: "2rem",
    lg: "1rem",
    md: "0.5rem",
    sm: "0.25rem",
    xs: "0.125rem",
    "2xs": "0.0625rem",
    "3xs": "0.03125rem",
    none: 0
  },
  radii: {
    ...ChakraTheme.radii,
    xl: "0.75rem"
  },
  icons: {
    ...ChakraTheme.icons,
    ...projectIcons
  }
};

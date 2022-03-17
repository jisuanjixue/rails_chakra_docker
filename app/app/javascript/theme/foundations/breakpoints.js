// 1. Import the utilities
import { createBreakpoints } from "@chakra-ui/theme-tools";
// 2. Update the breakpoints as key-value pairs
export const breakpoints = createBreakpoints({
  sm: "1024px",
  md: "1280px",
  lg: "1440px",
  xl: "1920px",
  "2xl": "1536px",
});

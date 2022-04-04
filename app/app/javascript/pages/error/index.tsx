import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Error() {
  const location: any = useLocation();
  const { value } = location.state;
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, teal.400, teal.600)" backgroundClip="text">
        {value}
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        {value === "403" ? "您没有权限访问此页面" : "没有查找到您要访问的页面"}
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button colorScheme="teal" bgGradient="linear(to-r, teal.400, teal.500, teal.600)" color="white" variant="solid">
        回到首页
      </Button>
    </Box>
  );
}

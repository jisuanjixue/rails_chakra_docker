import React from "react";
import { Flex, useColorModeValue, Icon, Box, chakra } from "@chakra-ui/react";

const Alter = ({ titleColor, textColor, title, text, icon }) => {
  return (
    <Flex maxW="sm" w="full" mx="auto" bg={useColorModeValue("white", "gray.800")} shadow="md" rounded="lg" overflow="hidden">
      <Flex justifyContent="center" alignItems="center" w={12} bg={`"${titleColor}"`}>
        <Icon as={icon} color="white" boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span color={useColorModeValue(`"${titleColor}"`, `"${titleColor}"`)} fontWeight="bold">
            {title}
          </chakra.span>
          <chakra.p color={useColorModeValue(`"${textColor}"`, `"${textColor}"`)} fontSize="sm">
            {text}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  );
};

export default Alter;

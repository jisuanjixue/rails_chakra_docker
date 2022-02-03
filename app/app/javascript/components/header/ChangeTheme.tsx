import React from "react";
import { useColorMode, Button, Icon } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ChangeTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button size="sm" colorScheme="blue" onClick={toggleColorMode}>
      {colorMode === "light" ? <Icon as={SunIcon} /> : <Icon as={MoonIcon} />}
    </Button>
  );
};

export default ChangeTheme;

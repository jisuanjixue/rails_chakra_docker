import React, { useRef } from "react";
// Chakra Imports
import { Button, useColorModeValue } from "@chakra-ui/react";
// Custom Icons
import { SettingsIcon } from "@components/icons/Icons";

export default function FixedPlugin(props) {
  const { secondary, onOpen } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const bgButton = useColorModeValue("white", "gray.600");
  let fixedDisplay = "flex";
  if (secondary) {
    fixedDisplay = "none";
  }

  const settingsRef: any = useRef();
  return (
    <>
      <Button
        h="52px"
        w="52px"
        onClick={onOpen}
        bg={bgButton}
        position="fixed"
        variant="no-hover"
        left={document.documentElement.dir === "rtl" ? "35px" : ""}
        right={document.documentElement.dir === "rtl" ? "" : "35px"}
        bottom="30px"
        borderRadius="50px"
        boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
      >
        <SettingsIcon
          cursor="pointer"
          ref={settingsRef}
          color={navbarIcon}
          w="20px"
          h="20px"
        />
      </Button>
    </>
  );
}

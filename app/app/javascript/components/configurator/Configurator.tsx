// Chakra Imports
import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Separator } from "@components/separator/Separator";

export default function Configurator(props) {
  const {
    secondary,
    isChecked,
    isOpen,
    onClose,
    onTransparent,
    onOpaque,
    onSwitch,
  } = props;
  const [switched, setSwitched] = useState(isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (secondary) {
    fixedDisplay = "none";
  }

  const bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  const colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const settingsRef: any = React.useRef();
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
              Purity UI Configurator
            </Text>
            <Text fontSize="md" mb="16px">
              See your dashboard options.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Box>
                <Text fontSize="md" fontWeight="600">
                  Sidenav Type
                </Text>
                <Text fontSize="sm" mb="16px">
                  Choose between 2 different sidenav types.
                </Text>
                <Flex>
                  <Button
                    w="50%"
                    p="8px 32px"
                    me="8px"
                    colorScheme="teal"
                    borderColor="teal.300"
                    color="teal.300"
                    variant="outline"
                    fontSize="xs"
                    onClick={onTransparent}
                  >
                    Transparent
                  </Button>
                  <Button
                    type="submit"
                    bg="teal.300"
                    w="50%"
                    p="8px 32px"
                    mb={5}
                    _hover="teal.300"
                    color="white"
                    fontSize="xs"
                    onClick={onOpaque}
                  >
                    Opaque
                  </Button>
                </Flex>
              </Box>
              <Box
                display={fixedDisplay}
                justifyContent="space-between "
                mb="16px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme="teal"
                  isChecked={switched}
                  onChange={() => {
                    if (switched === true) {
                      onSwitch(false);
                      setSwitched(false);
                    } else {
                      onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Box>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              </Flex>

              <Separator />
              <Box mt="24px">
                <Text fontSize="md" fontWeight="600">
                  Sidenav Type
                </Text>
                <Text fontSize="sm" mb="16px">
                  Choose between 2 different sidenav types.
                </Text>
                <Box>
                  <Link
                    href="https://www.creative-tim.com/product/purity-ui-dashboard"
                    w="100%"
                    mb="16px"
                  >
                    <Button
                      w="100%"
                      mb="16px"
                      bg={bgButton}
                      color={colorButton}
                      fontSize="xs"
                      variant="no-hover"
                      px="30px"
                    >
                      Free Download
                    </Button>
                  </Link>
                  <Link
                    href="https://demos.creative-tim.com/docs-purity-ui-dashboard/"
                    w="100%"
                  >
                    <Button
                      w="100%"
                      bg={secondaryButtonBg}
                      border="1px solid"
                      borderColor={secondaryButtonBorder}
                      color={secondaryButtonColor}
                      fontSize="xs"
                      variant="no-hover"
                      px="20px"
                      mb="16px"
                    >
                      <Text textDecorationColor="none">Documentation</Text>
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

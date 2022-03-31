import React, { useState, useCallback } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, Button, Text, Flex, FormControl, Heading, Input, Stack, useColorModeValue } from "@chakra-ui/react";
import sendApi from "../../apis/send";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const resetRequest = () => {
    sendApi.create({ email: email });
  };

  const handValue = useCallback(e => setEmail(e.target.value), [email]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>重置密码</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex minH={"50vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={4} w={"full"} maxW={"md"} bg={useColorModeValue("white", "gray.700")} rounded={"xl"} boxShadow={"lg"} p={6} my={12}>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                忘记您的密码?
              </Heading>
              <Text fontSize={{ base: "sm", sm: "md" }} color={useColorModeValue("gray.800", "gray.400")}>
                您将收到一封包含重置链接的电子邮件
              </Text>
              <FormControl id="email">
                <Input placeholder="your-email@example.com" _placeholder={{ color: "gray.500" }} type="email" onChange={e => handValue(e)} />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => resetRequest()}
                >
                  请求重置
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPassword;

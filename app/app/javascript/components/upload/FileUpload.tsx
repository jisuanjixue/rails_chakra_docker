import React, { useCallback } from "react";
import { FormLabel, FormControl, Button, Container, Box, Input, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Thumb from "./Thumb";
import uploadApi from "../../apis/upload";

const FileUpload = ({ formik }) => {
  const onDrop = useCallback(([file]) => {
    const formData = new FormData();
    formData.append("file", file);
    (async () => {
      const res = await uploadApi.create(formData);
      formik.setFieldValue("avatar_url", `http://localhost:3000/${res.data}`);
    })();
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  const handUpload = () => {
    open();
    if (acceptedFiles.length > 0) {
      uploadApi.create(acceptedFiles[0]);
    }
  };

  return (
    <Box as="form">
      <FormControl>
        <FormLabel>头像</FormLabel>
        <Container w={100} h={200}>
          <Box {...getRootProps({ className: "dropzone" })}>
            <Input name="file" {...getInputProps()} />
            <Text>拖动文件到此或点击上传</Text>
          </Box>
          <Thumb files={acceptedFiles} />
        </Container>
      </FormControl>
      <Button loadingText="上传中" onClick={() => handUpload()} colorScheme="teal" variant="outline">
        上传
      </Button>
    </Box>
  );
};

export default FileUpload;

import { FormLabel, FormControl, Text, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Dropzone from "react-dropzone";
import yup from "yup";
import Thumb from "./Thumb";

const FileUpload = () => {
  const dropzoneStyle = {
    width: "100%",
    height: "auto",
    borderWidth: 2,
    borderColor: "rgb(102, 102, 102)",
    borderStyle: "dashed",
    borderRadius: 5,
  };

  return (
    <Formik
      initialValues={{
        files: [],
      }}
      onSubmit={values => {
        alert(
          JSON.stringify(
            {
              files: values.files.map((file: any) => ({
                fileName: file.name,
                type: file.type,
                size: `${file.size} bytes`,
              })),
            },
            null,
            2
          )
        );
      }}
      validationSchema={yup.object().shape({
        recaptcha: yup.array(),
      })}
      render={({ values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Multiple files</FormLabel>
            <Dropzone
              style={dropzoneStyle}
              accept="image/*"
              onDrop={acceptedFiles => {
                // do nothing if no files
                if (acceptedFiles.length === 0) {
                  return;
                }
                // on drop we add to the existing files
                setFieldValue("files", values.files.concat(acceptedFiles));
              }}
            >
              {({ isDragActive, isDragReject }) => {
                if (isDragActive) {
                  return "This file is authorized";
                }

                if (isDragReject) {
                  return "This file is not authorized";
                }

                if (values.files.length === 0) {
                  return <Text>Try dragging a file here!</Text>;
                }

                return values.files.map((file, i) => (
                  <Thumb key={i} file={file} />
                ));
              }}
            </Dropzone>
          </FormControl>
          <Button
            type="submit"
            isLoading
            loadingText="上传中"
            colorScheme="teal"
            variant="outline"
          >
            上传
          </Button>
        </Form>
      )}
    />
  );
};

export default FileUpload;

import React from "react";
import { AspectRatio, Image } from "@chakra-ui/react";

const Thumb = ({ files }) => {
  return (
    <>
      {files.map((file, index) => (
        <AspectRatio maxW="400px" ratio={4 / 3} key={index}>
          <Image boxSize="100px" fallbackSrc="https://via.placeholder.com/150" src={file.preview} alt={file.name} objectFit="cover" />
        </AspectRatio>
      ))}
    </>
  );
};

export default Thumb;

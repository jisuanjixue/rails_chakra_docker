import React, { useState, useEffect } from "react";
import { AspectRatio, Image } from "@chakra-ui/react";

const Thumb = ({ file }) => {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState<any>("");

  useEffect(() => {
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumb(reader.result);
      setLoading(false);
    };
  }, [file]);

  return (
    <AspectRatio maxW="400px" ratio={4 / 3}>
      <Image
        fallbackSrc={loading ? "https://via.placeholder.com/150" : thumb}
        src={thumb}
        alt={file.name}
        objectFit="cover"
      />
    </AspectRatio>
  );
};

export default Thumb;

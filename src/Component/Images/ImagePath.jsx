// import { useQuery } from "@tanstack/react-query";
// import getImage from "./ImageApiSlice";

// const ImagePath = ({ file }) => {
//   const {
//     isPending,
//     error,
//     data: imagePath,
//   } = useQuery({
//     queryKey: ["ImagePath"],
//     queryFn: () => getImage(file),
//   });

//   return <img src={imagePath} />;
// };

// export default ImagePath;

import { useQuery } from "@tanstack/react-query";
import getImage from "./ImageApiSlice";

const ImagePath = ({ file }) => {
  const {
    isFetching,
    error,
    data: imageData,
  } = useQuery({
    queryKey: ["ImagePath", file],
    queryFn: () => getImage(file),
  });

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!imageData) {
    return <p>No image data available</p>;
  }

  const blob = new Blob([imageData], { type: "image/jpeg" }); // Adjust the type based on your image format
  const imageUrl = URL.createObjectURL(blob);

  return <img src={imageUrl} alt="Image" />;
};

export default ImagePath;

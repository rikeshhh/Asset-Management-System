import { useQuery } from "@tanstack/react-query";
import getImage from "./ImageApiSlice";

const ImagePath = ({ file, state }) => {
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

  const blob = new Blob([imageData], { type: "image/jpeg/png" }); // Adjust the type based on your image format
  const imageUrl = URL.createObjectURL(blob);

  // state.setProfileImage = { imageUrl };

  return <img src={imageUrl} alt="" />;
};

export default ImagePath;

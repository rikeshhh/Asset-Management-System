import { useQuery } from "@tanstack/react-query";
import getImage from "./ImageApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ImagePath = ({ file, setImageFlag }) => {
  const {
    isFetching,
    error,
    data: imageData,
  } = useQuery({
    queryKey: ["ImagePath", file],
    queryFn: () => getImage(file),
  });

  if (isFetching) {
    return (
      <p>
        <Skeleton circle={true} height={177} width={177} />
      </p>
    );
  }

  if (error) {
    setImageFlag(true);
    return <p>No image data available</p>;
  }

  if (!imageData) {
    setImageFlag(true);
    return <p>No image data available</p>;
  }

  if (imageData) {
    setImageFlag(false);
  }

  const blob = new Blob([imageData], { type: "image/jpeg/png/jpg" }); // Adjust the type based on your image format
  const imageUrl = URL.createObjectURL(blob);

  // state.setProfileImage = { imageUrl };

  return <img src={imageUrl} alt="" />;
};

export default ImagePath;

import { useDropzone } from "react-dropzone";
import { Label } from "../Label/Label";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { GoTrash } from "react-icons/go";
import { UploadSvg } from "../svg/UploadSvg";
import ImagePath from "../Images/ImagePath";
import { notifyError } from "../Toast/Toast";
import CustomToastContainer from "../Toast/ToastContainer";

const DropzoneArea = ({ setValue, name, defaultValue, isDisabled }) => {
  const [importedImage, setImportedImage] = useState(defaultValue || null);

  console.log(defaultValue);
  const [newImage, setNewImage] = useState();
  useEffect(() => {
    // Set default value if it's provided
    if (defaultValue) {
      setImportedImage(defaultValue);
      setValue(name, defaultValue); // Set form value using setValue
    }
  }, [defaultValue, setValue, name]); // Include setValue and name in dependencies array

  const onDrop = (acceptedFiles) => {
    // Handle dropped files
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Check if file size exceeds 5MB
        notifyError("File size exceeds 5MB");
      } else if (!["image/jpeg", "image/png"].includes(file.type)) {
        // Check if file type is not JPEG or PNG
        notifyError("Unsupported file type. Only JPEG and PNG are allowed");
      } else {
        setValue(name, file);
        const imageUrl = URL.createObjectURL(file);
        setImportedImage(imageUrl);
        setNewImage(imageUrl);
        setErrorMessage(null); // Clear error message if file is valid
      }
    }
  };
  const deleteImage = () => {
    setValue(name, null);
    setImportedImage(null);
  };
  const [drop, setDrop] = useState(true);
  const openDrop = () => {
    setDrop((prev) => !prev);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg", // Accept only PNG and JPEG files
  });
  return (
    <div className="assets__form--input">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "dropzone__active" : ""}`}
      >
        {importedImage === null ? (
          <>
            <div className="upload__svg">
              <UploadSvg />
            </div>
            <div className="upload__image--file">
              <Label text="Drag files to upload" />
              <p>or</p>
              <Button
                type={"button"}
                text={"Browse File"}
                className={"button__blue upload__drag--btn"}
              />
            </div>
            <input
              {...getInputProps()}
              disabled={isDisabled}
              accept="image/png, image/jpeg"
            />
            <div className="upload__para">
              <p>Max File Size: 5MB</p>
              <p>Supported File Type: JPG, PNG</p>
            </div>
          </>
        ) : (
          <>
            <div className="image__display">
              {" "}
              <div className="image__display">
                <figure>
                  {newImage ? (
                    <img src={newImage} />
                  ) : (
                    <ImagePath file={importedImage || newImage} />
                  )}
                </figure>
                {/* Render other elements conditionally here */}
              </div>
              <Button
                type={"button"}
                icon={<GoTrash />}
                className={"button__red drag__button"}
                handleClick={deleteImage}
                disabled={isDisabled}
              />
            </div>
          </>
        )}
      </div>
      <CustomToastContainer />
    </div>
  );
};

export default DropzoneArea;

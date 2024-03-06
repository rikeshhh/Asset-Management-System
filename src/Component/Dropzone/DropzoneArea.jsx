import { useDropzone } from "react-dropzone";
import { Label } from "../Label/Label";
import { useState } from "react";
import Button from "../Button/Button";
import { GoTrash } from "react-icons/go";
import { UploadSvg } from "../svg/UploadSvg";

const DropzoneArea = ({ setValue, name, defaultValue }) => {
  console.log("default Value");
  console.log(defaultValue);
  const [importedImage, setImportedImage] = useState(defaultValue || null);
  const onDrop = (acceptedFiles) => {
    // Handle dropped files
    const file = acceptedFiles[0];
    setValue(name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImportedImage(imageUrl);
    }
  };

  const deleteImage = () => {
    setImportedImage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
            <input {...getInputProps()} />
            <div className="upload__para">
              <p>Max File Size: 3MB</p>
              <p>Supported File Type: JPG, PNG</p>
            </div>
          </>
        ) : (
          <>
            <div className="image__display">
              <img src={importedImage} alt="image" />
              <Button
                type={"button"}
                icon={<GoTrash />}
                className={"button__red drag__button"}
                handleClick={deleteImage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropzoneArea;

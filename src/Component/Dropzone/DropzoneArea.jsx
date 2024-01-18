import { useDropzone } from "react-dropzone";

const DropzoneArea = () => {
  const onDrop = (acceptedFiles) => {
    // Handle dropped files
    console.log("Dropped files:", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className="assets__form--input">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </div>
    </div>
  );
};

export default DropzoneArea;

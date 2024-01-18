import React from "react";
import AssetsForm from "./AssetsForm";

const AddAssets = () => {
  return (
    <section className="assets__add">
      <AssetsForm
        formHeading={"Enter an Asset"}
        formType={"New Assets"}
        buttonText="Add an Asset"
        buttonCancelText="Cancel"
      />
    </section>
  );
};

export default AddAssets;

import AssetsForm from "./AssetsForm";

const EditAssets = () => {
  return (
    <section className="assets__add">
      <AssetsForm
        formHeading={"Edit Asset Details"}
        formType={"Asset Details"}
        buttonText="Save Changes"
        buttonCancelText="Cancel"
      />
    </section>
  );
};

export default EditAssets;

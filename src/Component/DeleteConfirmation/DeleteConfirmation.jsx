import "./DeleteConfirmation.css";
import Button from "../Button/Button";
import { deleteIcon } from "../Images/Image";

export const DeleteConfirmation = ({
  deleteName,
  handleCancelClick,
  handleProceedClick,
}) => {
  return (
    <div className="delete__box">
      <div className="delete__confirmation">
        <figure className="delete__confirmation--icon">
          <img src={deleteIcon} alt="" />
        </figure>
        <h4>Delete {deleteName}? </h4>
        <div className="delete__confirmation--info">
          <p>Are you sure you want to delete this {deleteName} permanently?</p>
          <p>This action cannot be undone.</p>
        </div>
        <div className="delete__confirmation--button">
          <Button
            className="button__red"
            text="Cancel"
            handleClick={handleCancelClick}
          />
          <Button
            className="button__blue"
            text="Proceed"
            handleClick={handleProceedClick}
          />
        </div>
      </div>
    </div>
  );
};

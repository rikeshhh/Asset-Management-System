import "./Filter.css";
import { RxCross1 } from "react-icons/rx";

const Filter = ({ handleClick }) => {
  return (
    <div className="filter">
      <div className="filter__heading">
        <h3>Filter</h3>
        <div className="filter__hide" onClick={handleClick}>
          <RxCross1 className="filter__heading--icon" />
        </div>
      </div>
    </div>
  );
};

export default Filter;

import React from "react";
import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { useForm } from "react-hook-form";
import {
  amex,
  jcb,
  mastercard,
  rupay,
  unionpay,
  visa,
} from "../../Component/Images/Image";

export const Credit = ({ goback, navigate }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitData = (data) => {
    console.log(data);
    navigate("/success");
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitData)} className="group__form ">
        <div className="form__input--section">
          <Label sup={"*"} text="Name on Card" />
          <InputField
            name="Card Name"
            register={register}
            value={Model.Username.pattern.value}
            message={Model.Username.pattern.message}
            required={Model.Username.required}
            errors={errors}
            type={Model.Username.type}
            placeholder={"Enter your card name"}
            minLength={Model.Username.minLength.value}
            minMessage={Model.Username.minLength.message}
            maxLength={Model.Username.maxLength.value}
            maxMessage={Model.Username.maxLength.message}
          />
        </div>
        <div className="form__input--section card__types--title">
          <Label text={"Card Types Accepted"} />
          <div className="card__types--image">
            <figure className="card__types--figure">
              <img src={rupay} alt="Rupay" />
            </figure>
            <figure className="card__types--figure">
              <img src={visa} alt="visa" />
            </figure>
            <figure className="card__types--figure">
              <img src={mastercard} alt="mastercard" />
            </figure>
            <figure className="card__types--figure">
              <img src={amex} alt="amex" />
            </figure>
            <figure className="card__types--figure">
              <img src={jcb} alt="jcb" />
            </figure>
            <figure className="card__types--figure">
              <img src={unionpay} alt="unionpay" />
            </figure>
          </div>
          <div className="card__warning">Your card issuer may charge a fee</div>
        </div>
        <div className="form__input--section">
          <Label sup={"*"} text="Card Number" />
          <InputField
            name="Card Number"
            register={register}
            value={Model.ZipCode.pattern.value}
            message={"Enter a valid card number"}
            required={Model.ZipCode.required}
            errors={errors}
            type={Model.ZipCode.type}
            placeholder={"Enter your card number"}
          />
        </div>
        <div className="basic__dets--country">
          <div className="form__input--section">
            <Label sup={"*"} text="Expiration Date" />
            <InputField
              name="Expiration Date"
              register={register}
              value={Model.ZipCode.pattern.value}
              message={"Enter a valid expiration date"}
              required={Model.ZipCode.required}
              errors={errors}
              type={Model.ZipCode.type}
              placeholder={"Enter your date of expiry"}
            />
          </div>
          <div className="form__input--section">
            <Label text="Security Code" />
            <InputField
              name="Expiration Date"
              register={register}
              value={Model.ZipCode.pattern.value}
              message={"Enter a valid security code"}
              errors={errors}
              type={Model.ZipCode.type}
              placeholder={"Enter the security code"}
            />
          </div>
        </div>
        <div className="pricing__flex--end ">
          <div className="pricing__button">
            {/* <Link to="/payment" state={receivedFeature} className="link"> */}
            <Button type="submit" className="button__blue" text="Continue" />
            {/* </Link> */}
            <Button
              type="button"
              className="button__red "
              text="Go back"
              handleClick={goback}
            />
          </div>
        </div>
      </form>
    </>
  );
};

import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { FcOk } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAmsContext } from "../../Context/AmsContext";

/**
 * Component for handling pricing form, capturing user details, and navigating to payment.
 * @returns {JSX.Element} The JSX representation of the component.
 */
const PricingForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isAnnualBilling, toggleBilling, getBusinessRate, getEnterpriseRate } =
    useAmsContext();

  const location = useLocation();
  const receivedFeature = location.state;

  const navigate = useNavigate();

  const option = ["Nepal", "India", "Australia"];

  /**
   * Handles the form submission and navigates to the payment page.
   * @param {Object} data - Form data submitted by the user.
   */
  const submitData = (data) => {
    navigate("/payment", { state: receivedFeature });
  };

  return (
    <section className="content-wrapper">
      <div className="content-radius">
        <div className="content__header plans__flex">
          <div className="">
            <h2>Pricing</h2>
            <span>
              We have a plan that is perfect for you and your business.
            </span>
          </div>
          <div className="pricing__header--btn">
            <Button text="Basic Details" className="basic__dets" />
            <Button text="Payment Details" className="payment__dets" />
          </div>
        </div>
        <div className="pricing__content">
          <div className="pricing__content--left">
            <div className="plans__offer--info">
              <div>
                <span>{receivedFeature.title}</span>
                <p>{receivedFeature.desc}</p>
              </div>
            </div>
            {receivedFeature.title === "Basics Plan" ? (
              <></>
            ) : (
              <div className="plans__top--right basic__dets--toggleBtn">
                <button
                  onClick={toggleBilling}
                  disabled={isAnnualBilling}
                  className={isAnnualBilling ? "plans__btn" : ""}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={toggleBilling}
                  disabled={!isAnnualBilling}
                  className={!isAnnualBilling ? "plans__btn" : ""}
                >
                  Annual Billing
                </button>
              </div>
            )}

            <div className="plans__offer--features">
              <h4>Features</h4>
              <span className="plans__offer-desc">{receivedFeature.label}</span>
              <div className="features__list pricing__feature">
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {receivedFeature.one}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {receivedFeature.two}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {receivedFeature.three}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {receivedFeature.four}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {receivedFeature.five}
                </p>
              </div>
              <div className="pricing__money">
                <h3>Total Due</h3>
                {receivedFeature.title === "Basics Plan" && <h3>Free</h3>}
                {receivedFeature.title === "Business Plan" && (
                  <h4>
                    ${getBusinessRate}.00{" "}
                    {isAnnualBilling === true ? (
                      <span>/ Month</span>
                    ) : (
                      <span>/ Year</span>
                    )}
                  </h4>
                )}
                {receivedFeature.title === "Enterprise Plan" && (
                  <h4>
                    ${getEnterpriseRate}.00{" "}
                    {isAnnualBilling === true ? (
                      <span>/ Month</span>
                    ) : (
                      <span>/ Year</span>
                    )}
                  </h4>
                )}
              </div>
            </div>
          </div>
          <div className="pricing__content--right">
            <form
              onSubmit={handleSubmit(submitData)}
              className="group__form pricing__form"
            >
              <div className="form__input--section">
                <Label sup={"*"} text="Name" />
                <InputField
                  name="Username"
                  register={register}
                  value={Model.Name.pattern.value}
                  message={Model.Name.pattern.message}
                  required={Model.Name.required}
                  errors={errors}
                  type={Model.Name.type}
                  placeholder={Model.Name.placeholder}
                  minLength={Model.Name.minLength.value}
                  minMessage={Model.Name.minLength.message}
                  maxLength={Model.Name.maxLength.value}
                  maxMessage={Model.Name.maxLength.message}
                />
              </div>

              <div className="form__input--section">
                <Label sup={"*"} text="Email" />
                <InputField
                  name="Email"
                  register={register}
                  value={Model.Email.pattern.value}
                  message={Model.Email.pattern.message}
                  required={Model.Email.required}
                  errors={errors}
                  type={Model.Email.type}
                  placeholder={Model.Email.placeholder}
                  maxLength={Model.Email.maxLength.value}
                  maxMessage={Model.Email.maxLength.message}
                />
              </div>
              <div className="basic__dets--country">
                <div className="form__input--section">
                  <Label sup={"*"} text="Country" />
                  {/* <SelectInput
                    option={option}
                    register={register}
                    defaultValue={"Nepal"}
                  /> */}
                </div>
                <div className="form__input--section">
                  <Label text={"ZipCode"} />
                  <InputField
                    name="ZipCode"
                    register={register}
                    value={Model.ZipCode.pattern.value}
                    message={Model.ZipCode.pattern.message}
                    errors={errors}
                    type={Model.ZipCode.type}
                    placeholder={Model.ZipCode.placeholder}
                    // minLength={Model.ZipCode.minLength.value}
                    // minMessage={Model.ZipCode.minLength.message}
                    // maxLength={Model.ZipCode.maxLength.value}
                    // maxMessage={Model.ZipCode.maxLength.message}
                  />
                </div>
              </div>
              <div className="form__input--section">
                <Label sup={"*"} text="Phone Number" />
                <InputField
                  name="PhoneNumber"
                  register={register}
                  value={Model.PhoneNumber.pattern.value}
                  message={Model.PhoneNumber.pattern.message}
                  required={Model.PhoneNumber.required}
                  errors={errors}
                  type={Model.PhoneNumber.type}
                  placeholder={Model.PhoneNumber.placeholder}
                  minLength={Model.PhoneNumber.minLength.value}
                  minMessage={Model.PhoneNumber.minLength.message}
                  maxLength={Model.PhoneNumber.maxLength.value}
                  maxMessage={Model.PhoneNumber.maxLength.message}
                />
              </div>
              <div className="form__input--section">
                <p className="pricing__policy">
                  By proceeding I agree to AMS’s <span>Terms of Service</span>{" "}
                  and <span>Privacy Policy</span>
                </p>
              </div>
              <div className="pricing__flex--end">
                <div className="pricing__button">
                  {/* <Link to="/payment" state={receivedFeature} className="link"> */}
                  <Button
                    type="submit"
                    className="button__blue"
                    text="Continue"
                  />
                  {/* </Link> */}

                  <Link to="/plans" className="link">
                    <Button className="button__red" text="Cancel" />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingForm;

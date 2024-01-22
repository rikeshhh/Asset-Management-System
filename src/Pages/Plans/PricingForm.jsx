import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { FcOk } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { Link, useLocation } from "react-router-dom";
import { usePricingContext } from "../../Component/Context/PricingContext";

const PricingForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isAnnualBilling, toggleBilling, getBusinessRate, getEnterpriseRate } =
    usePricingContext();

  const location = useLocation();
  const receivedFeature = location.state;

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
              <div className="plans__top--right">
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
              <div className="features__list">
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
                  <h3>
                    ${getBusinessRate}{" "}
                    {isAnnualBilling === true ? (
                      <span>/ Month</span>
                    ) : (
                      <span>/ Year</span>
                    )}
                  </h3>
                )}
                {receivedFeature.title === "Enterprise Plan" && (
                  <h3>
                    ${getEnterpriseRate}{" "}
                    {isAnnualBilling === true ? (
                      <span>/ Month</span>
                    ) : (
                      <span>/ Year</span>
                    )}
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className="pricing__content--right">
            <form
              onSubmit={handleSubmit()}
              className="user__profile--form pricing__form"
            >
              <div className="user__profile--section">
                <Label text="Name" />
                <InputField
                  name="Username"
                  register={register}
                  value={Model.Username.pattern.value}
                  message={Model.Username.pattern.message}
                  required={Model.Username.required}
                  errors={errors}
                  type={Model.Username.type}
                  placeholder={Model.Username.placeholder}
                  minLength={Model.Username.minLength.value}
                  minMessage={Model.Username.minLength.message}
                  maxLength={Model.Username.maxLength.value}
                  maxMessage={Model.Username.maxLength.message}
                />
              </div>

              <div className="user__profile--section">
                <Label text="Email" />
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
              <div className="user__profile--section">
                <Label text="Phone Number" />
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
              <div>
                <Link to="/payment" state={receivedFeature} className="link">
                  <Button className="button__blue" text="Continue" />
                </Link>

                <Link to="/plans" className="link">
                  <Button className="button__red" text="Cancel" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingForm;

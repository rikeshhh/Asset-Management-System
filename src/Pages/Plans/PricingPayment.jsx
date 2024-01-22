import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { useForm } from "react-hook-form";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { usePricingContext } from "../../Component/Context/PricingContext";
import { CreditCard } from "../../Component/svg/CreditCard";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import Model from "../../Component/Model/Model";

const PricingPayment = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const receivedFeature = location.state;

  const navigate = useNavigate();
  const back = useNavigate();

  const { getBusinessRate, getEnterpriseRate } = usePricingContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handleCreditClick = () => {
    setSelectedPaymentMethod("creditCard");
  };

  const handlePayPalClick = () => {
    setSelectedPaymentMethod("paypal");
  };

  const submitData = (data) => {
    console.log(data);
    navigate("/success");
  };

  const goBack = () => {
    back("/pricingForm", { state: receivedFeature });
  };

  const paypalSubmit = (data) => {
    console.log(data);
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
            <Button text="Basic Details" className="payment__dets" />
            <Button text="Payment Details" className="basic__dets" />
          </div>
        </div>
        <div className="pricing__content">
          <div className="pricing__content__left">
            <div
              className={
                selectedPaymentMethod === "creditCard"
                  ? "payment__active"
                  : "pricing__payment"
              }
              onClick={handleCreditClick}
            >
              <figure className="credit__svg">
                <CreditCard />
              </figure>
              <div className="payment__left--content">
                <div className="payment__left--title">
                  <p>Credit / Debit Card</p>
                </div>
                <div className="payment__left--desc">
                  <p>Visa, Mastercard, Amex, Rupay & more</p>
                </div>
              </div>
            </div>
            <div
              className={
                selectedPaymentMethod === "paypal"
                  ? "payment__active"
                  : "pricing__payment pricing__paypal"
              }
              onClick={handlePayPalClick}
            >
              <figure className="paypal__svg">
                <img src="/src/assets/paypal.png" alt="" />
              </figure>
              <div className="payment__left--content">
                <div className="payment__left--title">
                  <p>PayPal</p>
                </div>
                <div className="payment__left--desc">
                  <p>Pay using your Paypal</p>
                </div>
              </div>
            </div>
            <div className="plans__offer--info pricing__plans--border">
              <div className="payment__dets--border">
                <span>{receivedFeature.title}</span>
                <p>{receivedFeature.desc}</p>
              </div>

              <div className="plans__offer--features">
                <div className="pricing__money payment__pricing--top">
                  <h3>Total Due</h3>
                  {receivedFeature.title === "Basics Plan" && <h3>Free</h3>}
                  {receivedFeature.title === "Business Plan" && (
                    <h4>${getBusinessRate}.00</h4>
                  )}
                  {receivedFeature.title === "Enterprise Plan" && (
                    <h4>${getEnterpriseRate}.00</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pricing__content--right">
            {selectedPaymentMethod === "creditCard" && (
              <form
                onSubmit={handleSubmit(submitData)}
                className="group__form "
              >
                <div className="form__input--section">
                  <Label text="Name on Card" />
                  <InputField
                    name="Card Name"
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
                <div className="form__input--section card__types--title">
                  <Label text={"Card Types Accepted"} />
                  <div className="card__types--image">
                    <figure className="card__types--figure">
                      <img src="/src/assets/rupay.png" alt="Rupay" />
                    </figure>
                    <figure className="card__types--figure">
                      <img src="/src/assets/visa.png" alt="Rupay" />
                    </figure>
                    <figure className="card__types--figure">
                      <img src="/src/assets/mastercard.png" alt="Rupay" />
                    </figure>
                    <figure className="card__types--figure">
                      <img src="/src/assets/amex.png" alt="Rupay" />
                    </figure>
                    <figure className="card__types--figure">
                      <img src="/src/assets/jcb.png" alt="Rupay" />
                    </figure>
                    <figure className="card__types--figure">
                      <img src="/src/assets/unionpay.png" alt="Rupay" />
                    </figure>
                  </div>
                  <div className="card__warning">
                    Your card issuer may charge a fee
                  </div>
                </div>
                <div className="form__input--section">
                  <Label text="Card Number" />
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
                    <Label text="Expiration Date" />
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
                      required={Model.ZipCode.required}
                      errors={errors}
                      type={Model.ZipCode.type}
                      placeholder={"Enter the security code"}
                    />
                  </div>
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

                    <Button
                      className="button__red"
                      text="Go back"
                      handleClick={goBack}
                    />
                  </div>
                </div>
              </form>
            )}
            {selectedPaymentMethod === "paypal" && (
              <div className="paypal__section">
                <div className="paypal__section--top">
                  <figure className="paypal__section--image">
                    <img src="/src/assets/paypal.png" alt="Paypal" />
                    <figcaption className="paypal__section--title">
                      Pay with PayPal
                    </figcaption>
                  </figure>
                </div>
                <form
                  onSubmit={handleSubmit(paypalSubmit)}
                  className="group__form"
                >
                  <div className="form__input--section">
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
                  <div className="form__input--section">
                    <Label text="Password" />
                    <InputField
                      name="Password"
                      register={register}
                      value={Model.Password.pattern.value}
                      message={Model.Password.pattern.message}
                      required={Model.Password.required}
                      errors={errors}
                      type={Model.Password.type}
                      placeholder={Model.Password.placeholder}
                      minLength={Model.Password.minLength.value}
                      minMessage={Model.Password.minLength.message}
                      maxLength={Model.Password.maxLength.value}
                      maxMessage={Model.Password.maxLength.message}
                    />
                  </div>
                  <div className="form__input--section">
                    <Button
                      text="Login"
                      className={"button__blue paypal__button"}
                      value="submit"
                    />
                  </div>
                  <div className="form__input--section">
                    <p className="paypal__ques">Having trouble loggin in?</p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPayment;

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
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export const Credit = ({ goback, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const client_secret = import.meta.env.VITE_APP_AMS_STRIPE_SKEY;

  const submitData = async (data) => {
    const paymentIntent = await stripe.paymentIntents.create({
      mode: 'payment',
      amount: 1000,
      currency: "USD",
      // additional options...
    });

    console.log(paymentIntent.client_secret);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Add billing details if needed
        },
      },
    });

    if (result.error) {
      console.error(result.error);
    } else if (result.paymentIntent.status === "succeeded") {
      // Payment succeeded
      console.log("Payment succeeded");
      navigate("/success");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitData)} className="group__form ">
        {/* <div className="form__input--section">
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
        </div> */}
        {/* <div className="pricing__flex--end ">
          <div className="pricing__button">
            <Button type="submit" className="button__blue" text="Continue" />
            <Button
              type="button"
              className="button__red "
              text="Go back"
              handleClick={goback}
            />
          </div>
        </div> */}
        <PaymentElement />
      </form>
    </>
  );
};

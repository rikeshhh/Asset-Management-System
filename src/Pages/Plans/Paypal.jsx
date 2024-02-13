import React, { useEffect, useRef, useState } from "react";
import { paypal } from "../../Component/Images/Image";
import Model from "../../Component/Model/Model";
import Button from "../../Component/Button/Button";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";

export const Paypal = ({ navigate, goback }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const paypalSubmit = (data) => {
    console.log(data);
    // navigate("/success");
    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "CAD",
                    value: 650.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }, []);
  };

  const [paypalClick, setPaypalClick] = useState(false);
  const paypal = useRef();

  return (
    <div className="paypal__section">
      <div className="paypal__section--top">
        <figure className="paypal__section--image">
          <img src={paypal} alt="Paypal" />
          <figcaption className="paypal__section--title">
            Pay with PayPal
          </figcaption>
        </figure>
      </div>
      <form onSubmit={handleSubmit(paypalSubmit)} className="group__form">
        {/* <div className="form__input--section">
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
        </div> */}
        <div className="form__input--section">
          <button
            className={"button__blue button__style paypal__button"}
            value="submit"
          >
            Click
          </button>{" "}
          <div ref={paypal}></div>
        </div>
        <div className="form__input--section">
          <p className="paypal__ques">Having trouble loggin in?</p>
        </div>
        <div className="pricing__flex--end">
          <div className="pricing__button">
            {/* <Link to="/payment" state={receivedFeature} className="link"> */}
            <Button type="submit" className="button__blue" text="Continue" />
            {/* </Link> */}

            <Button
              type="button"
              className="button__red"
              text="Go back"
              handleClick={goback}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

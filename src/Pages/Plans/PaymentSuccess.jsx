import React from "react";
import "./Plans.css";
import { paymentSuccess } from "../../Component/Images/Image";
import Button from "../../Component/Button/Button";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const paymentDetails = [
    {
      name: "TOTAL AMOUNT PAID",
      value: "$25.00",
    },
    {
      name: "Paid From",
      value: "Mastercard",
    },
    {
      name: "Transaction Date",
      value: "22 Aug 2023",
    },
  ];
  paymentDetails.map((item, i) => {
    console.log(item.name);
    console.log(item.value);
  });
  return (
    <>
      <section className="content-wrapper">
        <div className="content-radius ">
          <div className="payment__success">
            <div className="payment__wrapper">
              <div className="payment__success__top">
                <figure className="figure">
                  <img src={paymentSuccess} alt="Payment Success" />
                </figure>
                <div className="payment__success__message__heading">
                  <h2 className="payment-heading">Payment Successful</h2>
                  <p className="payment-details-message__value">
                    <span>Your payment is complete.</span>
                    <span>Details of transaction are included below.</span>
                  </p>
                </div>
              </div>
              <div className="payment__success__ref__box">
                <p className="payment__reference__number__payment__details">
                  <span className="payment__reference__text">
                    Reference Number
                  </span>
                  <span className="payment__reference__number">#41095-84</span>
                </p>
                <div className="payment__details__wrapper">
                  {paymentDetails.map((item, i) => (
                    <p key={i} className="payment__details__children">
                      <span className="payment__reference__number__payment__details">
                        {item.name}
                      </span>
                      <span className="payment-details-message__value payment__value">
                        {item.value}
                      </span>
                    </p>
                  ))}
                </div>
              </div>
              <p className="payment__contact__admin">
                Please contact the admin at <span>admin@ams.com </span>for help
              </p>
            </div>
          </div>
          <div className="button__wrapper">
            <Link to="/" className="link">
              <Button
                text="Close"
                type="submit"
                className="bottom__button button__blue"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentSuccess;

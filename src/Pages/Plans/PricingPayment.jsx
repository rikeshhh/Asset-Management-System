import { useState } from "react";
import Button from "../../Component/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { usePricingContext } from "../../Component/Context/PricingContext";
import { CreditCard } from "../../Component/svg/CreditCard";
import { Paypal } from "./Paypal";
import { Credit } from "./Credit";
import { paypal } from "../../Component/Images/Image";

const PricingPayment = () => {
  const location = useLocation();
  const receivedFeature = location.state;

  const navigate = useNavigate();

  const { getBusinessRate, getEnterpriseRate } = usePricingContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const handleCreditClick = () => {
    setSelectedPaymentMethod("creditCard");
  };

  const handlePayPalClick = () => {
    setSelectedPaymentMethod("paypal");
  };

  const goBack = () => {
    // back("/pricingForm", { state: receivedFeature });
    navigate(-1);
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
          <div className="pricing__content__left payment__left">
            <div>
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
                  <img src={paypal} alt="paypal" />
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
              <Credit goback={goBack} navigate={navigate} />
            )}
            {selectedPaymentMethod === "paypal" && (
              <Paypal navigate={navigate} goback={goBack} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPayment;

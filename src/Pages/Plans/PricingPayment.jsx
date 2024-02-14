import { useState } from "react";
import Button from "../../Component/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAmsContext } from "../../Context/AmsContext";
import { CreditCard } from "../../Component/svg/CreditCard";
import { Paypal } from "./Paypal";
import { Credit } from "./Credit";
import { paypalImage } from "../../Component/Images/Image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

var stripePromise = loadStripe(
  "pk_test_51OjDzQSDVqjNOfpcWjFWwyFB75nd2e7sqdhjwhyxkWrizywOjBqBoEOJyjVrq9afD6I1xX3xrtQamCKfJgLvnfUf00wUB84Wou"
);

const PricingPayment = () => {
  const location = useLocation();
  const receivedFeature = location.state;
  const client_secret = import.meta.env.VITE_APP_AMS_STRIPE_SKEY;

  const navigate = useNavigate();

  const { getBusinessRate, getEnterpriseRate } = useAmsContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("paypal");

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

  const options = {
    clientSecret: `${client_secret}`,
  };

  var rate = 0;

  if (receivedFeature.title === "Business Plan") {
    rate = getBusinessRate;
  } else if (receivedFeature.title === "Enterprise Plan") {
    rate = getEnterpriseRate;
  }
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
                  <img src={paypalImage} alt="paypal" />
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
              <Elements stripe={stripePromise} options={options}>
                <Credit goback={goBack} navigate={navigate} />
              </Elements>
            )}
            {selectedPaymentMethod === "paypal" && (
              <Paypal navigate={navigate} goback={goBack} rate={rate} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPayment;

import React from "react";
import Button from "../../Component/Button/Button";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { usePricingContext } from "../../Component/Context/PricingContext";

const PricingPayment = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const location = useLocation();
  const receivedData = location.state;

  const { getBusinessRate, getEnterpriseRate } = usePricingContext();

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
          <div className="pricing__content--left">
            <div className="plans__offer--info">
              <div>
                <span>{receivedData.title}</span>
                <p>{receivedData.desc}</p>
              </div>
            </div>

            <div className="plans__offer--features">
              <div className="pricing__money">
                <h3>Total Due</h3>
                {receivedData.title === "Basics Plan" && <h3>Free</h3>}
                {receivedData.title === "Business Plan" && (
                  <h3>${getBusinessRate}</h3>
                )}
                {receivedData.title === "Enterprise Plan" && (
                  <h3>${getEnterpriseRate}</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPayment;

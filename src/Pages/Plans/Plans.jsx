import { useState } from "react";
import Button from "../../Component/Button/Button";
import "./Plans.css";
import { FcOk } from "react-icons/fc";
import { PlansStar } from "../../Component/svg/PlansStar";
import { Link } from "react-router-dom";
import { useAmsContext } from "../../Component/Context/AmsContext";
import { features } from "./PlansFeatures";
import { house, building, factory } from "../../Component/Images/Image";
const Plans = () => {
  const { isAnnualBilling, toggleBilling, getBusinessRate, getEnterpriseRate } =
    useAmsContext();

  return (
    <section className="content-wrapper">
      <div className="content-radius">
        <div className="content__header plans__flex">
          <div>
            <h2>Pricing</h2>
            <span>
              We have a plan that is perfect for you and your business.
            </span>
          </div>
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
        </div>
        <div className="plans__offer">
          <div className="plans__offer--content">
            <figure>
              <img src={house} alt="" />
            </figure>
            <div className="plans__offer--info">
              <div>
                <span>{features.basic.title}</span>
                <h3>Free</h3>
                <p>{features.basic.desc}</p>
              </div>
              <div>
                <Link to="/pricingForm" state={features.basic} className="link">
                  <Button
                    className={"plans__button--one"}
                    text={"Get Started"}
                  />
                </Link>
                <Button
                  className={"plans__button--two"}
                  text={"Talk to Sales"}
                />
              </div>
            </div>
            <div className="plans__offer--features">
              <h4>Features</h4>
              <span className="plans__offer-desc">
                Popular features amongst begineers.
              </span>
              <div className="features__list">
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.basic.one}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.basic.two}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.basic.three}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.basic.four}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.basic.five}
                </p>
              </div>
            </div>
          </div>
          <div className="plans__offer--content">
            <figure>
              <img src={building} alt="" />
              <div className="plans__popular">
                <PlansStar /> Most Popular
              </div>
            </figure>

            <div className="plans__offer--info">
              <div>
                <span>{features.basic.title}</span>
                <h3>${getBusinessRate}</h3>
                <p>{features.business.desc}</p>
              </div>
              <div>
                <Link
                  to="/pricingForm"
                  className="link"
                  state={features.business}
                >
                  <Button
                    className={"plans__button--one"}
                    text={"Get Started"}
                  />
                </Link>
                <Button
                  className={"plans__button--two"}
                  text={"Talk to Sales"}
                />
              </div>
            </div>
            <div className="plans__offer--features">
              <h4>Features</h4>
              <span className="plans__offer-desc">
                Everything in our free plan plus..
              </span>
              <div className="features__list">
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.business.one}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.business.two}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.business.three}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.business.four}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.business.five}
                </p>
              </div>
            </div>
          </div>
          <div className="plans__offer--content">
            <figure>
              <img src={factory} alt="" />
            </figure>
            <div className="plans__offer--info">
              <div>
                <span>{features.basic.title}</span>
                <h3>${getEnterpriseRate}</h3>
                <p>{features.enterprise.desc}</p>
              </div>
              <div>
                <Link
                  to="/pricingForm"
                  state={features.enterprise}
                  className="link"
                >
                  <Button
                    className={"plans__button--one"}
                    text={"Get Started"}
                  />
                </Link>
                <Button
                  className={"plans__button--two"}
                  text={"Talk to Sales"}
                />
              </div>
            </div>
            <div className="plans__offer--features">
              <h4>Features</h4>
              <span className="plans__offer-desc">
                Everything in our business plan plus..
              </span>
              <div className="features__list">
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.enterprise.one}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.enterprise.two}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.enterprise.three}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.enterprise.four}
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  {features.enterprise.five}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;

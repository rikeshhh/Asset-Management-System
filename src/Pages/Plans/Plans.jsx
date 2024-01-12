import { useState } from "react";
import Button from "../../Component/Button/Button";
import "./Plans.css";
import { FcOk } from "react-icons/fc";

const Plans = () => {
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const businessMonthlyRate = 25;
  const businessAnnualRate = 275;
  const enterpriseMonthlyRate = 75;
  const enterpriseAnnualRate = 750;

  const handleBilling = () => {
    setIsAnnualBilling((prevIsAnnual) => !prevIsAnnual);
  };

  const getBusinessRate = isAnnualBilling
    ? businessMonthlyRate
    : businessAnnualRate;
  const getEnterpriseRate = isAnnualBilling
    ? enterpriseMonthlyRate
    : enterpriseAnnualRate;

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
              onClick={handleBilling}
              disabled={isAnnualBilling}
              className={isAnnualBilling ? "plans__btn" : ""}
            >
              Monthly Billing
            </button>
            <button
              onClick={handleBilling}
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
              <img src="/src/assets/House.svg" alt="" />
            </figure>
            <div className="plans__offer--info">
              <div>
                <span>Basic Plan</span>
                <h3>Free</h3>
                <p>Basic features for up to 10 users.</p>
              </div>
              <div>
                <Button className={"plans__button--one"} text={"Get Started"} />
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
                  Basic reporting and analytics
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Daily Synchronization
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Up to 10 individual users
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  20GB individual data each user
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Basic chat and email support
                </p>
              </div>
            </div>
          </div>
          <div className="plans__offer--content">
            <figure>
              <img src="/src/assets/Buildings.svg" alt="" />
            </figure>
            <div className="plans__offer--info">
              <div>
                <span>Business Plan</span>
                <h3>${getBusinessRate}</h3>
                <p>Growing teams up to 20 users.</p>
              </div>
              <div>
                <Button className={"plans__button--one"} text={"Get Started"} />
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
                  Access to basic features
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Hourly Synchronization
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Advance reporting and analysis
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  40GB individual data each user
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Priority chat and email support
                </p>
              </div>
            </div>
          </div>
          <div className="plans__offer--content">
            <figure>
              <img src="/src/assets/Factory.svg" alt="" />
            </figure>
            <div className="plans__offer--info">
              <div>
                <span>Enterprise Plan</span>
                <h3>${getEnterpriseRate}</h3>
                <p>Advance features + Unlimited users.</p>
              </div>
              <div>
                <Button className={"plans__button--one"} text={"Get Started"} />
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
                  Advance custom fields
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Audit log and data history
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Unlimited individual users
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Unlimited individual data
                </p>
                <p>
                  <span>
                    <FcOk />
                  </span>
                  Personalised + Priority Service
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

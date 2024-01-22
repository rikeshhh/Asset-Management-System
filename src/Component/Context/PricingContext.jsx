import { createContext, useContext, useState } from "react";

const PricingContext = createContext();

export const usePricingContext = () => {
  return useContext(PricingContext);
};

export const PricingProvider = ({ children }) => {
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);

  const businessMonthlyRate = 25;
  const businessAnnualRate = 275;
  const enterpriseMonthlyRate = 75;
  const enterpriseAnnualRate = 750;

  const toggleBilling = () => {
    setIsAnnualBilling((prevIsAnnual) => !prevIsAnnual);
  };

  const getBusinessRate = isAnnualBilling
    ? businessMonthlyRate
    : businessAnnualRate;
  const getEnterpriseRate = isAnnualBilling
    ? enterpriseMonthlyRate
    : enterpriseAnnualRate;

  const contextValue = {
    isAnnualBilling,
    toggleBilling,
    getBusinessRate,
    getEnterpriseRate,
  };

  return (
    <PricingContext.Provider value={contextValue}>
      {children}
    </PricingContext.Provider>
  );
};

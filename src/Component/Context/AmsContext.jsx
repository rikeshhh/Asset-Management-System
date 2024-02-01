import { createContext, useContext, useState } from "react";

const AmsContext = createContext();

export const useAmsContext = () => {
  return useContext(AmsContext);
};

export const AmsProvider = ({ children }) => {
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);
  const [auth, setAuth] = useState("");

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
    auth,
    setAuth,
  };

  return (
    <AmsContext.Provider value={contextValue}>{children}</AmsContext.Provider>
  );
};

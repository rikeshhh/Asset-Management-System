import React from "react";

const DateComponent = ({ date }) => {
  // Create a Date object from the provided date string
  const currentDate = new Date(date);

  // Extract date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();

  // Format the date as "day th month year"
  const formattedDate = `${day}th ${getMonthName(month)} ${year}`;

  // Helper function to get the month name from the array
  function getMonthName(monthIndex) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex - 1];
  }

  return <div>{formattedDate}</div>;
};

export default DateComponent;

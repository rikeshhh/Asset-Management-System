const Model = {
  Username: {
    type: "string",
    required: "Please enter your username",
    placeholder: "Enter your username",
    minLength: {
      value: 4,
      message: "Username should be at least 4 characters",
    },
    maxLength: {
      value: 20,
      message: "Username should be less than 20 characters",
    },
    pattern: {
      value: "^[a-zA-Z0-9 ]+$",
      message: "Please enter a valid username",
    },
  },
  Email: {
    type: "email",
    required: "Email is required",
    placeholder: "Enter your email address",
    maxLength: {
      value: 64,
      message: "Value must be less than 64",
    },
    pattern: {
      value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message: "Please follow the instructions",
    },
  },

  Password: {
    type: "password",
    required: "Password is should not be empty",
    placeholder: "Enter your password",
    minLength: {
      value: 8,
      message:
        "Password should be at least 8 characters and should contain numbeers",
    },
    maxLength: {
      value: 64,
      message: "Password should be less than 64 characters",
    },
    pattern: {
      value: "^(?=.*[A-Za-z])(?=.*\\d).*$",
      message:
        "Invalid password format (at least 8 characters, at least one letter, and one number)",
    },
  },
  Checkbox: {
    type: "checkbox",
    required: "Checkbox must be checked",
    placeholder: "I agree to the terms and conditions",
  },
  Radio: {
    type: "radio",
    required: "must be selected",
  },
  PhoneNumber: {
    type: "text",
    required: "must be valid",
    minLength: {
      value: 10,
      message: "Phone number must be 10 in length",
    },
    maxLength: {
      value: 10,
      message: "Phone number must be 10 in length",
    },
    placeholder: "Enter your valid phone number",
    pattern: {
      value: "^[0-9]+$",
      message: "Phone number should only contain numbers",
    },
  },
  Designation: {
    type: "string",
    required: "Please enter your designation",
    placeholder: "Enter your designation",
    minLength: {
      value: 4,
      message: "Designation must be at least 4 characters",
    },
    maxLength: {
      value: 20,
      message: "Designation should be less than 20 characters",
    },
    pattern: {
      value: "^[a-zA-Z]+$",
      message: "Please enter a valid designation",
    },
  },
  Group: {
    type: "string",
    required: "Please enter the sub category",
    placeholder: "Enter the name",
    minLength: {
      value: 2,
      message: "Categories must be at least 4 characters",
    },
    maxLength: {
      value: 20,
      message: "Categories should be less than 20 characters",
    },
    pattern: {
      value: "^[a-zA-Z]+$",
      message: "Please enter a valid categories containing alphabets",
    },
  },
  ZipCode: {
    type: "text",
    required: "Required ",
    // minLength: {
    //   value: 10,
    //   message: "Phone number must be 10 in length",
    // },
    // maxLength: {
    //   value: 10,
    //   message: "Phone number must be 10 in length",
    // },
    placeholder: "Enter a valid zip code",
    pattern: {
      value: "^[0-9]+$",
      message: "Enter a valid numeric zip code",
    },
  },
  Date: {
    type: "date",
    placeholder: "Filter by Date",
    pattern: {
      value: "^d{2}/d{2}/d{4}$",
      message: "Date should be in MM/DD/YYYY format",
    },
  },
};
export default Model;

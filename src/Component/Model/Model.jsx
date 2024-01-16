const Model = {
  Username: {
    type: "string",
    required: "Please enter your username",
    placeholder: "Enter your username",
    minLength: 4,
    minMessage: "Username should be at least 4 characters",
    maxLength: 20,
    minMessage: "Username should be less than 20 characters",
    value: "^[a-zA-Z]+$",
    message: "Please enter a valid username",
  },
  Email: {
    type: "email",
    required: "Email is required",
    errorMessage: "Please enter a valid email address",
    placeholder: "Enter your email address",
    minLength: {
      value: 1,
      message: "Value must be greater than one",
    },
    maxLength: {
      value: 255,
      message: "Value must be less than 255",
    },
    value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    message: "Please follow the instructions",
  },

  Password: {
    type: "password",
    required: "Password is should not be empty",
    placeholder: "Enter your password",
    minLength: 8,
    minMessage:
      "Password should be at least 8 characters and should contain numbeers",
    maxLength: 20,
    minMessage: "Password should be less than 20 characters",
    value: "^(?=.*[A-Za-z])(?=.*\\d).*$",
    message:
      "Invalid password format (at least 8 characters, at least one letter, and one number)",
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
  RetypePassword: {
    type: "password",
    required: "Must match the password",
    errorMessage: "Incorrect password format",
    minLength: 4,
    minMessage: "Password should be at least 4 characters",
    maxLength: 20,
    minMessage: "Password should be less than 20 characters",
    placeholder: "Enter your password again",
    value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    message: "Must match the above password",
  },
  PhoneNumber: {
    type: "number",
    required: "must be valid",
    minLength: 1,
    maxLength: 10,
    placeholder: "Enter your valid phone number",
    value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    message:
      "Invalid password format (at least 8 characters, at least one letter, and one number)",
  },
  Designation: {
    type: "string",
    required: "Please enter your designation",
    placeholder: "Enter your designation",
    minLength: 1,
    maxLength: 10,
  },
  Categories: {
    type: "string",
    required: "Please enter the sub category",
    placeholder: "Enter the name",
    minLength: 1,
    maxLength: 10,
  },
};
export default Model;

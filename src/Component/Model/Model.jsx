const Model = {
  Username: {
    type: "string",
    required: "Please enter your username",
    placeholder: "Enter your username",
    minLength: 1,
    maxLength: 10,
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
    required: "Password is required",
    errorMessage: "Password should not be empty",
    minLength: 5,
    disabled: true,
    placeholder: "Enter your password",
    maxLength: 10,

    value: "^(?=.*[A-Za-z])(?=.*\\d).*$",
    message:
      "Invalid password format (at least 8 characters, at least one letter, and one number)",
  },
  Checkbox: {
    type: "checkbox",
    required: "Checkbox must be checked",
    errorMessage: "Please check the checkbox",
    placeholder: "I agree to the terms and conditions",
  },
  Radio: {
    type: "radio",
    required: "must be selected",
    errorMessage: "Please select an option",
  },
  RetypePassword: {
    type: "password",
    required: "Must match the password",
    errorMessage: "Incorrect password format",
    minLength: 1,
    maxLength: 10,
    placeholder: "Enter your password again",
    value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    message:
      "Invalid password format (at least 8 characters, at least one letter, and one number)",
  },
  PhoneNumber: {
    type: "number",
    required: "must be valid",
    errorMessage: "Incorrect password format",
    minLength: 1,
    maxLength: 10,
    placeholder: "Enter your password again",
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
};
export default Model;

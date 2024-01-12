const Model ={
  Username: {
    type: "string",
    required: true,
    errorMessage: "Please enter your username",
    placeholder: "Enter your username",
    minLength: 1,
    maxLength: 10,
  },
  Email: {
    type: "email",
    required: true,
    errorMessage: "Please enter a valid email address",
    placeholder: "Enter your email address",
    minLength: {
      value:1,
      message:'Value must be greater than one'
    },
    maxLength: {
      value:255,
      message:'Value must be less than 255'
    },
    pattern: {
      value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message: "Please follow the instructions",
    },
  },

  Password: {
    type: "password",
    required: true,
    errorMessage: "Password should not be empty",
    minLength: 5,
    disabled: true,
    placeholder: "Enter your password",
    maxLength: 10,
    pattern: {
      value: "^(?=.*[A-Za-z])(?=.*\\d).*$",
      message:
        "Invalid password format (at least 8 characters, at least one letter, and one number)",
    },
  },
  Checkbox: {
    type: "checkbox",
    required: true,
    errorMessage: "Please check the checkbox",
    placeholder: "I agree to the terms and conditions",
  },
  Radio: {
    type: "radio",
    required: true,
    errorMessage: "Please select an option",
   
  },
  RetypePassword: {
    type: "password",
    required: true,
    errorMessage: "Incorrect password format",
    minLength: 1,
    maxLength: 10,
    placeholder: "Enter your password again",
    pattern: {
      value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
      message:
        "Invalid password format (at least 8 characters, at least one letter, and one number)",
    },
  },
  PhoneNumber: {
    type: "number",
    required: true,
    errorMessage: "Incorrect password format",
    minLength: 1,
    maxLength: 10,
    placeholder: "Enter your password again",
    pattern: {
      value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
      message:
        "Invalid password format (at least 8 characters, at least one letter, and one number)",
    },
  },
};
export default Model;

export const validate = {
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
    minLength: 1,
    maxLength: 22,
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
    placeholder: "Enter your password",
    maxLength: 10,
    pattern: {
      value: "^(?=.*[A-Za-z])(?=.*\\d).*$",
      message:
        "Invalid password format (at least 8 characters, at least one letter, and one number)",
    },
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
};

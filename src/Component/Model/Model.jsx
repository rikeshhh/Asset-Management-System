const Model = {
  Username: {
    type: "string",
    required: "Please enter your username",
    placeholder: "Enter your username",
    minLength: {
      value: 4,
      message: "Username must be at least 4 characters long",
    },
    maxLength: {
      value: 20,
      message: "Username should be less than 20 characters",
    },
    pattern: {
      value: "^[a-zA-Z0-9]+(?:[_/-/.][a-zA-Z0-9]+)*$",

      message: "Please enter a valid username",
    },
  },
  Name: {
    type: "string",
    required: "Please enter your name",
    placeholder: "Enter your name",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long",
    },
    maxLength: {
      value: 64,
      message: "Name should be less than 64 characters",
    },
    pattern: {
      value: "^[a-zA-Z0-9 ]+$",
      message: "Please enter a valid Name",
    },
  },
  Email: {
    type: "email",
    required: "Please enter your email address",
    placeholder: "Enter your email address",
    maxLength: {
      value: 64,
      message: "Email must be less than 64 characters",
    },
    pattern: {
      value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      message: "Invalid Email. Please provide a valid email",
    },
  },

  Password: {
    type: "password",
    required: "Please enter your password",
    placeholder: "Enter your password",
    minLength: {
      value: 8,
      message:
        "Password must be at least 8 characters long, must include a capital letter and a numeric character",
    },
    maxLength: {
      value: 16,
      message: "Password must be less than 64 characters",
    },
    pattern: {
      value: "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_+=]).*$",
      message:
        "Invalid password. Password must be at least 8 characters long, must include a capital letter and a numeric character",
    },
  },
  Checkbox: {
    type: "checkbox",
    required: "Checkbox must be checked",
    placeholder: "I agree to the terms and conditions",
  },
  Radio: {
    type: "radio",
    required: "Must be checked",
  },
  PhoneNumber: {
    type: "text",
    required: "Please enter a valid phone number",
    minLength: {
      value: 6,
      message: "Phone number must have 6 characters.",
    },
    maxLength: {
      value: 15,
      message: "Phone number must be not more than 15 characters.",
    },
    placeholder: "Enter your phone number",
    pattern: {
      value: /^(98|97)[0-9]+(\+)?$/,
      message: "Phone number should only contain numbers and start from 97/98",
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
      value: "^[a-zA-Z0-9 ]+$",
      message: "Please enter a valid designation",
    },
  },
  Group: {
    type: "string",
    required: "Please enter field value",
    placeholder: "Enter the name",
    minLength: {
      value: 2,
      message: "Field must be at least 2 characters long",
    },
    maxLength: {
      value: 20,
      message: "Field should be less than 20 characters",
    },
    pattern: {
      value: "^[a-zA-Z]+$",
      message: "Please enter a valid category with alphabets",
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
  ProductCode: {
    type: "string",
    required: "Please enter a product code",
    placeholder: "Enter the product code of the assets",
    minLength: {
      value: 8,
      message:
        "Product key must be start with 'ITJ' followed by dash,capital letter 'DA' dash and numbers",
    },
    maxLength: {
      value: 20,
      message: "Product key should be less than 20 characters",
    },
    pattern: {
      // value: /^ITJ-DA-[0-9]+$/,
      message:
        "Please enter a valid Product Code. It should start with 'ITJ' followed by dash,capital letter 'DA' dash and numbers",
    },
  },
  ProductName: {
    type: "string",
    required: "Please enter a product name",
    placeholder: "Enter the product name of the assets",
    minLength: {
      value: 2,
      message: "Product name must be at least 2 characters long",
    },
    maxLength: {
      value: 16,
      message: "Product name should be less than 16 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9-]+$/,
      message:
        "Please enter a valid product name. It can include capital letters, small letters, and numbers.",
    },
  },
  location: {
    type: "string",
    required: "Please enter a location name",
    placeholder: "Enter a location name",
    minLength: {
      value: 1,
      message: "Location name should be more than 1 characters",
    },
    maxLength: {
      value: 64,
      message: "Location name should be less than 64 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9 ]+$/,
      message: "Please enter a valid alphanumeric string.",
    },
  },
  department: {
    type: "string",
    required: "Please enter a Department name",
    placeholder: "Enter a department name",
    minLength: {
      value: 1,
      message: "Department name should be more than 1 characters",
    },
    maxLength: {
      value: 32,
      message: "Department name should be less than 32 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Please enter a valid alphabets.",
    },
  },
};
export default Model;

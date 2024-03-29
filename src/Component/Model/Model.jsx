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
      value:
        /^(?![^._-]*[-._][^._-]*[-._])[A-Za-z][A-Za-z0-9]*[-._]?[A-Za-z0-9]*$/,
      message: "Username must contain alphabet in the start",
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
      value: "^[a-zA-Z ]+$",
      message: "Invalid name. Name must contain only alphabetic characters",
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
      value: /^[\w-]+(?:\.[\w-]+)*@(?!.*(?:\.[^.]+){2,})[\w-]+(?:\.[\w-]+)+$/,
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
        "Password must be at least 8 characters long, must include a capital and small letter and a numeric and special character",
    },
    maxLength: {
      value: 20,
      message: "Password must be less than 20 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      message:
        "Invalid password. Password must be at least 8 characters long, must include a capital and small letter and a numeric and special character",
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
      value: 10,
      message: "Phone number must have 10 characters.",
    },
    maxLength: {
      value: 10,
      message: "Phone number must be exactly of 10 characters.",
    },
    placeholder: "Enter your phone number",
    pattern: {
      value: /^(97|98)[0-9]*$/,
      message:
        "Phone number should only contain numbers and must start with 97/98",
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
  assetSearch: {
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
    placeholder: "YYYY-MM-DD",
    pattern: {
      value: "^d{4}-d{2}-d{2}$/",
      message: "Date should be in YYYY-MM-DD format",
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
      value: 64,
      message: "Product name should be less than 64 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9 -]+$/,
      message:
        "Please enter a valid product name. It can include capital letters, small letters, numbers, and spaces.",
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
      value: /^[a-zA-Z0-9\s]+$/,
      message: "Please enter a valid alphanumeric string.",
    },
  },
  reason: {
    type: "string",
    required: "Please enter a reason",
    minLength: {
      value: 1,
      message: "Reason should be more than 1 character",
    },
    maxLength: {
      value: 64,
      message: "Reason should be less than 64 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9\s]+$/,
      message: "Please enter a valid alphanumeric string",
    },
  },
  brandCompanyName: {
    type: "string",
    required: "Please enter a brand company name",
    minLength: {
      value: 1,
      message: "Brand company name should be more than 1 character",
    },
    maxLength: {
      value: 64,
      message: "Brand company name should be less than 64 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9\s]+$/,
      message: "Please enter a valid brand name",
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
      message: "Please enter valid alphabets.",
    },
  },
  Category: {
    type: "string",
    required: "Please enter a Category name",
    placeholder: "Enter the Category name",
    minLength: {
      value: 1,
      message: "Category name should be more than 1 characters",
    },
    maxLength: {
      value: 64,
      message: "Category name should be less than 64 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9\s]+$/,
      message: "Please enter valid alphanumeric string.",
    },
  },
};
export default Model;

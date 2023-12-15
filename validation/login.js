const Validator = require("validator");
const isEmpty = require("is-empty");
function validateStudentLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.registration = !isEmpty(data.registration) ? data.registration : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Registration checks for student
    if (Validator.isEmpty(data.registration)) {
        errors.registration = "Registration field is required";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};


function validateTeacherLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
    validateStudentLoginInput,
    validateTeacherLoginInput
};
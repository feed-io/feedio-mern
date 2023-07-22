import { useState } from "react";

function useValidation() {
  const [values, setValues] = useState({
    // name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    // name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    switch (name) {
      case "name":
        setErrors({
          ...errors,
          name: value ? "" : "Name is required",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Invalid email address",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Password must be at least 8 characters",
        });
        break;
      case "passwordConfirm":
        setErrors({
          ...errors,
          passwordConfirm:
            values.password === value ? "" : "Passwords must match",
        });
        break;
      default:
        break;
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return { values, errors, handleChange };
}

export default useValidation;

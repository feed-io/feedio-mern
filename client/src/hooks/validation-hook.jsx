import { useState } from "react";

function useValidation() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "", // Add passwordConfirm initial state
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "", // Add passwordConfirm initial error state
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    switch (name) {
      case "username":
        setErrors({
          ...errors,
          username: value ? "" : "Username is required",
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
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return { values, errors, handleChange };
}

export default useValidation;

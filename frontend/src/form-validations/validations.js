import React from 'react'
import validator from 'react-validation';

export const required = (value, props) => {
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">Required</span>;
  }
};

export const email = (value) => {
  if (!validator.isEmail(value)) {
    return <span className="form-error is-visible">${value} is not a valid email.</span>;
  }
};

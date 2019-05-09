import { elementType } from "prop-types";

export const validate = (element, formdata = []) => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Must be valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? "Passwords do not match" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formdata, formName) => {
  const newFormdata = {
    ...formdata
  };

  const newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;

  newFormdata[element.id] = newElement;

  return newFormdata;
};

export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
};

export const ifFormValid = (formdata, formName) => {
  let formisValid = true;
  for (let key in formdata) {
    formisValid = formdata[key].valid && formisValid;
  }

  return formisValid;
};

export const populateOptionFields = (formdata, arrayData = [], field) => {
  const newArray = [];
  const newFormdata = { ...formdata };

  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormdata[field].config.options = newArray;

  return newFormdata;
};

export const resetFields = (formdata, formname) => {
  const newFormdata = { ...formdata };

  for (let key in newFormdata) {
    if (key === "images") {
      newFormdata[key].value = [];
    } else {
      newFormdata[key].value = "";
    }
    newFormdata[key].valid = false;
    newFormdata[key].touched = false;
    newFormdata[key].validationMessage = "";
  }

  return newFormdata;
};

export const populateFields = (formdata, fields) => {
  for (let key in formdata) {
    formdata[key].value = fields[key];
    formdata[key].valid = true;
    formdata[key].touched = true;
    formdata[key].validationMessage = "";
  }
  return formdata;
};

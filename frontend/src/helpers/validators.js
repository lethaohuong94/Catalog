/* eslint-disable import/prefer-default-export */
export function validateTextInput(field_name, field_value = '') {
  if (field_value.length < 1) {
    throw Error(`Please enter ${field_name}`);
  }
}
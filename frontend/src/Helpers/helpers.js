import toastr from 'toastr';

export function showErrorToast(message) {
  toastr.clear();
  toastr.error(message);
}

export function showSuccessToast(message) {
  toastr.clear();
  toastr.success(message);
}

export function validateTextInput(field_name, field_value = '') {
  if (field_value.length < 1) {
    throw Error(`Please enter ${field_name}`);
  }
}
import toastr from 'toastr';

export function showErrorToast(message) {
  toastr.clear();
  toastr.error(message);
}

export function showSuccessToast(message) {
  toastr.clear();
  toastr.success(message);
}

import toastr from 'toastr';

export function ShowErrorToast(message) {
  toastr.clear();
  toastr.error(message);
}

export function ShowSuccessToast(message) {
  toastr.clear();
  toastr.success(message);
}
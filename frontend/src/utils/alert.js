import Swal from "sweetalert2";

export const showSuccess = (msg) => {
  return Swal.fire("Success", msg, "success");
};

export const showError = (msg) => {
  return Swal.fire("Error", msg, "error");
};

export const showConfirm = async (msg) => {
  const result = await Swal.fire({
    title: msg,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel"
  });

  return result.isConfirmed;
};
export const showLoading = (msg = "Please wait...") => {
  return Swal.fire({
    title: msg,
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

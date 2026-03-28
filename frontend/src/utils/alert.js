import Swal from "sweetalert2";

export const showSuccess = (msg) => {
  Swal.fire("Success", msg, "success");
};

export const showError = (msg) => {
  Swal.fire("Error", msg, "error");
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
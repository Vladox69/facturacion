import Swal from "sweetalert2";

// Configuración base para todos los Swal
const baseSwal = Swal.mixin({
  customClass: {
    popup:
      "bg-white dark:bg-black text-black dark:text-white rounded-xl shadow-lg p-6",
    title: "text-lg font-semibold",
    confirmButton: "bg-black text-white px-4 py-2 rounded hover:bg-gray-800",
    cancelButton: "bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300",
  },
  buttonsStyling: false,
});

export const showSuccess = (message, isNavigate = false, navigate = null) => {
  baseSwal
    .fire({
      icon: "success",
      title: message,
      confirmButtonText: "Ok",
    })
    .then(() => {
      if (isNavigate && navigate) {
        navigate();
      }
    });
};

export const showError = (message) => {
  baseSwal.fire({
    icon: "error",
    title: message,
    confirmButtonText: "Cerrar",
  });
};

export const showInfo = (message, isNavigate = false, navigate = null) => {
  baseSwal
    .fire({
      icon: "info",
      title: message,
      confirmButtonText: "Entendido",
    })
    .then(() => {
      if (isNavigate) {
        navigate();
      }
    });
};

export const showConfirm = async (message) => {
  const result = await baseSwal.fire({
    title: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });

  return result.isConfirmed;
};

export const showLoading = (
  message = "Cargando...",
  isNavigate = false,
  navigate = null
) => {
  baseSwal
    .fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    })
    .then(() => {
      if (isNavigate) {
        navigate();
      }
    });
};

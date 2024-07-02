import { toast, Bounce } from 'react-toastify';

export const showSuccessToast = (text) => {
  toast.success(text, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'dark',
    transition: Bounce,
  });
};

export const showErrorToast = (text) => {
  toast.error(text, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'dark',
    transition: Bounce,
  });
};

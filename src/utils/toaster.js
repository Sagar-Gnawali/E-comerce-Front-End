import { toast } from 'react-toastify';

const showSuccess = (message) => {
    toast.success(message);
}

const showInfo = (message,time=5000) => {
    toast.info(message,{autoClose:time});
}
const showWarning = (message) => {
    toast.warning(message);
}

const showError = (message) => {
    toast.error(message);
}

export const notify = {
    showSuccess,
    showInfo,
    showWarning,
    showError
}
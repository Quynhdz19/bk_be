import { ToastContainer } from 'react-toastify';
import './toast.scss';

const ToastContext = () => {
  return (
    <ToastContainer
      bodyClassName="body-toast"
      toastClassName={(props) => {
        switch (props?.type) {
          case 'info':
            return 'wrapper-toast';
          case 'error':
            return 'wrapper-toast wrapper-error-toast';
          case 'success':
            return 'wrapper-toast wrapper-success-toast';
          case 'warning':
            return 'wrapper-toast wrapper-warning-toast';
          case 'default':
            return 'wrapper-toast';
          default:
            return 'wrapper-toast';
        }
      }}
      autoClose={3000}
      draggable={false}
      hideProgressBar
      pauseOnHover={false}
      position="top-right"
      limit={1}
    />
  );
};

export default ToastContext;

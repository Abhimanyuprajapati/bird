import toast from 'react-hot-toast';

const Toaster = (message, type) => {
// console.log("from toaster message and type", message, type);

  const setting = {
    duration: 3000,
    position: 'top-right',
    style: {        
        background: type === true ? 'green' : "red",
        color: '#fff'
    },
  };
  switch (type) {
    case true:
      return toast.success(message, setting);
    case false:
      return toast.error(message, setting);
    default:
      return toast(message, setting);
  }
};

export default Toaster;
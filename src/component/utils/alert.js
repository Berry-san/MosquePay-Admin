import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../../assets/images/logo1.png'

export const showErrorToast = (errorMessage) => {
  Swal.fire({
    imageUrl: logo,
    imageHeight: 50,
    width: 300,
    padding: '0.5em',
    imageWidth: 50,
    title: 'Error',
    text: errorMessage,
    confirmButtonText: 'Retry',
    confirmButtonColor: '#127EC8',
    showCloseButton: true,
  })
  //   ;<ToastContainer
  //     position="top-right"
  //     autoClose={5000}
  //     hideProgressBar={false}
  //     newestOnTop={false}
  //     closeOnClick
  //     rtl={false}
  //     pauseOnFocusLoss
  //     draggable
  //     pauseOnHover
  //     theme="colored"
  //   />

  //   toast.error(errorMessage, {
  //     position: toast.POSITION.TOP_RIGHT,
  //   })

  return null
}

export const showSuccessToast = (successMessage) => {
  Swal.fire({
    imageUrl: logo,
    imageHeight: 50,
    width: 300,
    padding: '0.5em',
    imageWidth: 50,
    title: 'success',
    text: successMessage,
    // showCloseButton: true,
  })

  return null
}

export const ShowPassDetails = (title, message) => {
  Swal.fire({
    imageUrl: logo,
    imageHeight: 50,
    width: 500,
    padding: '0.5em',
    imageWidth: 50,
    title: title,
    //text: message,
    // showCloseButton: true,
    html: `<div style="text-align: left">${message}</div>`,
  })

  return null // We don't need to render anything for this component
}

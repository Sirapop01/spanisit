'use client'

import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function ToastNotification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      transition={Bounce}
    />
  )
}
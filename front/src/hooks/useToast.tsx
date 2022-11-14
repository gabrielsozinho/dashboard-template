import { useCallback, useState } from 'react'
import Toast, { ToastData } from '../components/Toast'

const useToast = () => {
  const [data, setToastData] = useState<ToastData>()
  const showToast = (data: Omit<ToastData, 'createdAt'>) => {
    setToastData({
      ...data,
      createdAt: new Date()
    })
  }

  const handleClose = () => {
    setToastData(undefined)
  }    

  const ToastElement = useCallback(() => (
    <Toast
      data={data}  
      onClose={handleClose}
    />
  ), [data])

  return {
    Toast: ToastElement,
    showToast,
  }
}

export default useToast

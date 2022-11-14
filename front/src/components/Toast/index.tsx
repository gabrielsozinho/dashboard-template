import { Alert, Snackbar } from '@mui/material'
import { ComponentProps, FC, useEffect, useState } from 'react'

export type ToastData = {
  severity?: ComponentProps<typeof Alert>['severity']
  message: string
  createdAt: Date
}

type Props = {
  onClose: () => void;
  data?: ToastData;
}

const Toast: FC<Props> = ({ onClose, data }) => {
  const [toastData, setToastData] = useState<ToastData>({
    message: '',
    createdAt: new Date()
  })

  useEffect(() => {
    if (!data) return
    setToastData(data)
  }, [data])  

  const isOpen = Boolean(data)

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        severity={toastData.severity}
        onClose={onClose}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {toastData.message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
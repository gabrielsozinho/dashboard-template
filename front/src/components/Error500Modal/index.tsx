import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, TextareaAutosize, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type Error = {
  type: string
  message: string
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const closeBtnStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
}

const Error500Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<Error>()
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const errorDescription = error ? error.type + '\n\n' + error.message  : ''

  useEffect(() => {
    const callback = (e: Event) => {
      const { detail } = e as CustomEvent<Error>
      setError(detail)
      openModal()
    }

    document.addEventListener('response500', callback)
    return () => document.removeEventListener('response500', callback)
  }, [])

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="500-modal-title"
      aria-describedby="500-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={closeBtnStyle}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="500-modal-title" variant="h6">
          Sorry, an error occurred
        </Typography>
        <TextareaAutosize
          id="500-modal-description"
          aria-label="error description"
          style={{ width: 336, resize: 'vertical' }}
          value={errorDescription}
          readOnly
        />
      </Box>
    </Modal>
  )
}

export default Error500Modal

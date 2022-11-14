import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { FC } from 'react';
import { User } from '../../types';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const closeBtnStyle = {
  position: 'absolute',
  top: '4px',
  right: '4px',
}

type Props = {
  user: User
  onClose: () => void
  onDelete: () => void
  isDeleting: boolean
  isOpen: boolean
}

const UserDeleteModal: FC<Props> = ({ user, onClose, onDelete, isDeleting, isOpen }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-delete-modal-title"
      aria-describedby="user-delete-modal-description"
    >
      <Box sx={boxStyle}>
        <IconButton
          sx={closeBtnStyle}
          size="small"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="user-delete-modal-title"
          variant="h4"
        >
          Do you really want to delete this entry?
        </Typography>
        <Typography id="user-delete-modal-description">
          User: {user.username}
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          gap="20px"
          sx={{
            mt: 'auto',
            ml: 'auto',
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
          >
            cancel
          </Button>
          <Button
            color="warning"
            variant="contained"
            disabled={isDeleting}
            onClick={onDelete}
          >
            delete
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default UserDeleteModal

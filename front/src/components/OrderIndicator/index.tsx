import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box } from '@mui/material';

type Props = {
  active: boolean
  order: 'asc' | 'desc'
}

const commonArrowStyles = {
  position: 'absolute',
  left: 0,
  color: 'primary',
}

const OrderIndicator = ({ active, order }: Props) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        position: 'relative',
        width: 24,
        height: 24,
        opacity: active ? 1 : 0 
      }}
    >
      <ArrowDropUpIcon
        sx={{
          ...commonArrowStyles,
          top: -3,
          opacity: order === 'asc' ? 1 : 0.5,
        }}
      />
      <ArrowDropDownIcon
        sx={{
          ...commonArrowStyles,
          top: 3,
          opacity: order === 'desc' ? 1 : 0.5,
        }}
      />
    </Box>
  )
}

export default OrderIndicator
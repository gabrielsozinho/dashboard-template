import { FormControl, FormControlProps, InputLabel, InputLabelProps, InputProps, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled(OutlinedInput)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(2),
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    borderColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.input,
  },
  '& .MuiInputBase-input:focus': {
    backgroundColor: theme.palette.action.focus,
  },
}))

const Label = styled(InputLabel)(({ theme }) => ({
  '&': {
    color: theme.palette.secondary.main,
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  }
}))

type Props = InputProps & {
  label: string
  formControlProps?: FormControlProps
  inputLabelProps?: Omit<InputLabelProps, 'shrink' | 'htmlFor'>
}

const DashInput = ({ label, formControlProps, inputLabelProps, sx, ...inputBaseProps }: Props) => (
  <FormControl variant="standard" sx={sx} {...formControlProps}>
    <Label {...inputLabelProps} shrink htmlFor={inputBaseProps.id}>
      {label}
    </Label>
    <Input {...inputBaseProps} />
  </FormControl>
)

export default DashInput

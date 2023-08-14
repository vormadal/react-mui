import { CircularProgress } from '@mui/material'

export type SpinnerSize = 'small' | 'medium' | 'large'

type Props = { show?: boolean; size?: SpinnerSize }

const Spinner = ({ show, size }: Props) => {
  if (!show) return null

  let computedSize = 40
  switch (size) {
    case 'small':
      computedSize = 20
      break
    case 'medium':
      computedSize = 40
      break
    case 'large':
      computedSize = 60
      break
    default:
      computedSize = 40
  }
  return <CircularProgress size={computedSize} />
}

export default Spinner

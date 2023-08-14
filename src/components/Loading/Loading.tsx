import { Alert, Button } from '@mui/material'
import Spinner, { SpinnerSize } from '../Spinner'

type Props<T> = {
  children?: (data: T) => React.ReactElement
  loading?: boolean
  error?: string
  retry?: () => void | Promise<void>
  data?: T
  showReloads?: boolean
}

function Loading<T>({ children, loading, error, retry, data, showReloads }: Props<T>) {
  if (loading && (!data || showReloads)) return <Spinner show />
  if (error)
    return (
      <Alert
        severity="error"
        action={
          retry ? (
            <Button
              color="inherit"
              size="small"
              onClick={retry}
            >
              Retry
            </Button>
          ) : null
        }
      >
        {error}
      </Alert>
    )
  if (data && children) return children(data)
  return null
}

export default Loading

import { Alert, Button } from '@mui/material'
import Spinner from '../Spinner'

interface Props<T> {
  /**
   * A function which returns the child elements to be rendered.
   * The `data` will be passed as argument.
   * This function will only be called when `data` contains data
   * @param data the value passed in data prop
   * @returns
   */
  children?: (data: T) => React.ReactElement
  /**
   * If true and data has no value a spinner is shown
   */
  loading?: boolean
  /**
   * Shows an alert containing this error message
   */
  error?: string
  /**
   * If specified, the alert will show a `retry` button which when clicked will run this function
   * @returns
   */
  retry?: () => void | Promise<void>
  /**
   * the data which will be passed to the `children` function when loading is complete
   */
  data?: T
  /**
   * If **true** the spinner will be shown everytime `loading` is **true**.
   */
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

import { Alert, Collapse, Grid, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { MessageOptions, ToastContext } from '../../contexts/ToastContext'

type MessageLevel = 'error' | 'success' | 'warning' | 'info'
interface SnackbarMessage {
  message: string
  level: MessageLevel
  key: number
  options?: MessageOptions
}

const Toaster = () => {
  const [, setActions] = useContext(ToastContext)
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined)

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  useEffect(() => {
    const notify = (message: string, level: MessageLevel, options?: MessageOptions) => {
      setSnackPack((prev) => [...prev, { message, level, key: new Date().getTime(), options }])
    }
    setActions({
      success: (message: string, options?: MessageOptions) => notify(message, 'success', options),
      error: (message: string, options?: MessageOptions) => notify(message, 'error', options),
      info: (message: string, options?: MessageOptions) => notify(message, 'info', options),
      warning: (message: string, options?: MessageOptions) => notify(message, 'warning', options)
    })
  }, [setActions])

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const alert = (
    <Alert
      severity={messageInfo?.level}
      onClose={handleClose}
      sx={{ width: '100%' }}
      title={messageInfo?.options?.title}
    >
      {messageInfo ? messageInfo.message : undefined}
    </Alert>
  )
  return (
    <>
      <Collapse in={messageInfo?.options?.embedded && open}>
        <Grid
          container
          justifyContent="center"
        >
          <Grid
            item
            xs={11}
            sx={{ pr: 4 }}
          >
            {alert}
          </Grid>
        </Grid>
      </Collapse>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={!messageInfo?.options?.embedded && open}
        autoHideDuration={6000}
        TransitionProps={{ onExited: handleExited }}
        onClose={handleClose}
      >
        {alert}
      </Snackbar>
    </>
  )
}

export default Toaster

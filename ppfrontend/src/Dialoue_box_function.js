import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.text}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tell us more!</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type here."
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send Verification Request</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

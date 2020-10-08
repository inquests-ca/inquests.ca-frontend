import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialog from '@material-ui/core/Dialog';

interface DialogProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
}

const Dialog = ({ title, content, open, onClose }: DialogProps) => (
  <MuiDialog open={open} onClose={onClose} aria-labelledby="simple-dialog-title">
    <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
    </DialogContent>
  </MuiDialog>
);

export default Dialog;

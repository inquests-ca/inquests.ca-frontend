import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialog from '@material-ui/core/Dialog';

interface DialogProps {
  children: React.ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
}

const Dialog = ({ children, title, open, onClose }: DialogProps) => (
  <MuiDialog open={open} onClose={onClose} aria-labelledby="dialog-title">
    <DialogTitle id="dialog-title">{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
  </MuiDialog>
);

export default Dialog;

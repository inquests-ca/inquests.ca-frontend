import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import Link from '@material-ui/core/Link';

import Dialog from 'common/components/Dialog';

interface MissingDocumentDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function MissingDocumentDialog({ open, onClose }: MissingDocumentDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="No Document Link">
      <DialogContentText>
        Sorry, Inquests.ca does not currently have a link to this document. It may be that no public
        link exists, or there may be copyright or other issues which prevent posting a link. If you
        are aware of a public link, please feel free to forward it to us at{' '}
        <Link href="mailto:askinquestsca@gmail.com">askinquestsca@gmail.com</Link>.
      </DialogContentText>
    </Dialog>
  );
}

import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

import Section from './Section';
import { Table, Row } from './Table';
import { AuthorityInternalLinks } from './InternalLinks';
import Dialog from 'common/components/Dialog';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson } from 'common/utils/request';
import { toReadableDateString } from 'common/utils/date';
import LoadingPage from 'common/components/LoadingPage';
import { Authority, Deceased, Inquest, InquestDocument } from 'common/models';
import {
  TEXT_DOCUMENT_MISSING_DIALOG_CONTENT,
  TEXT_DOCUMENT_MISSING_DIALOG_TITLE,
} from 'common/constants';

const useStyles = makeStyles((theme) => ({
  layout: {
    marginTop: theme.spacing(6),
  },
  headerSection: {
    marginLeft: theme.spacing(2),
  },
  document: {
    display: 'block',
  },
  primary: {
    color: theme.palette.secondary.main,
  },
  // Adds anchor styling to anchor elements without href attribute.
  modalLink: {
    cursor: 'pointer',
  },
}));

const HeaderSection = ({ inquest, classes }: { inquest: Inquest; classes: any }) => (
  <div className={classes.headerSection}>
    <Typography variant="h5" component="h1">
      {inquest.name}
    </Typography>
    {inquest.isPrimary ? (
      <Typography className={classes.primary} variant="h6" component="h2">
        Pivotal
      </Typography>
    ) : null}
    <Typography variant="h6" component="h2" gutterBottom>
      {inquest.jurisdiction.name}
      <br />
      {toReadableDateString(inquest.start)}
      {inquest.end ? ` - ${toReadableDateString(inquest.end)}` : ''}
    </Typography>
  </div>
);

const DetailsSection = ({ inquest }: { inquest: Inquest; classes: any }) => (
  <Section header="Details">
    <Table>
      <Row name="Overview">{inquest.overview}</Row>
      <Row name="Synopsis">{inquest.synopsis}</Row>
      <Row name="Notes">{inquest.notes}</Row>
      <Row name="Presiding&nbsp;Officer">{inquest.presidingOfficer}</Row>
      <Row name="Sitting Days">{inquest.sittingDays}</Row>
      <Row name="Exhibits">{inquest.exhibits}</Row>
    </Table>
  </Section>
);

const DeceasedSection = ({ deceasedList, classes }: { deceasedList: Deceased[]; classes: any }) => (
  <Section header="Deceased">
    {deceasedList.map((deceased, i) => (
      <div key={i}>
        <Typography variant="subtitle1" component="h4">
          {deceased.lastName || deceased.givenNames ? (
            `${deceased.lastName}, ${deceased.givenNames}`
          ) : (
            <span className={classes.metadata}>Name Withheld</span>
          )}
        </Typography>
        <Table>
          <Row compact name="Age">
            {deceased.age}
          </Row>
          <Row compact name="Sex">
            {deceased.sex}
          </Row>
          <Row compact name="Manner&nbsp;of&nbsp;Death">
            {deceased.deathManner.name}
          </Row>
          <Row compact name="Cause&nbsp;of&nbsp;Death">
            {deceased.deathCause}
          </Row>
          <Row compact name="Date&nbsp;of&nbsp;Death">
            {toReadableDateString(deceased.deathDate)}
          </Row>
          <Row compact name="Reason&nbsp;for&nbsp;Inquest">
            {deceased.inquestType.name}
          </Row>
        </Table>
        {i !== deceasedList.length - 1 ? <br /> : null}
      </div>
    ))}
  </Section>
);

// TODO: display other document data as needed (creation date).
// TODO: display document type.
// TODO: how to sort documents?
// TODO: is it safe to have a user-inputted href?
const DocumentsSection = ({
  documents,
  onDialogOpen,
  classes,
}: {
  documents: InquestDocument[];
  onDialogOpen: () => void;
  classes: any;
}) => (
  <Section header="Documents">
    {documents.map((doc, i) => (
      <span className={classes.document} key={i}>
        {doc.name}&nbsp;&mdash;&nbsp;
        {doc.inquestDocumentLinks.length ? (
          _.sortBy(doc.inquestDocumentLinks, 'isFree').map((documentLink, i) => (
            <span key={i}>
              <MuiLink href={documentLink.link}>{documentLink.documentSource.name}</MuiLink>
              {i !== doc.inquestDocumentLinks.length - 1 ? ', ' : ''}
            </span>
          ))
        ) : (
          <MuiLink className={classes.modalLink} onClick={onDialogOpen}>
            No Document Link
          </MuiLink>
        )}
      </span>
    ))}
  </Section>
);

const InternalLinksSection = ({ authorities }: { authorities: Authority[] }) => {
  if (!authorities.length) return null;

  return (
    <Section header="Related Authorities">
      <AuthorityInternalLinks authorities={authorities} />
    </Section>
  );
};

const ViewInquest = () => {
  const [inquest, setInquest] = useState<Inquest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { inquestId } = useParams<{ inquestId: string }>();

  const isMounted = useMountedState();

  useEffect(() => {
    const fetchInquest = async () => {
      const response = await fetchJson<Inquest>(`/inquests/${inquestId}`);
      // TODO: on 404, redirect to homepage.
      if (!response.error && isMounted()) setInquest(response.data!);
    };
    fetchInquest();
  }, [inquestId, isMounted]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const classes = useStyles();

  if (inquest === null) return <LoadingPage />;

  return (
    <Container className={classes.layout}>
      <HeaderSection inquest={inquest} classes={classes} />
      <DetailsSection inquest={inquest} classes={classes} />
      <DeceasedSection deceasedList={inquest.deceased} classes={classes} />
      <DocumentsSection
        documents={inquest.inquestDocuments}
        onDialogOpen={handleDialogOpen}
        classes={classes}
      />
      <InternalLinksSection authorities={inquest.authorities} />
      <Dialog
        title={TEXT_DOCUMENT_MISSING_DIALOG_TITLE}
        content={TEXT_DOCUMENT_MISSING_DIALOG_CONTENT}
        onClose={handleDialogClose}
        open={dialogOpen}
      />
    </Container>
  );
};

export default ViewInquest;

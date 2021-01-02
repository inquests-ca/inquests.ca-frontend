import React, { useState } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

import Section from './Section';
import { Table, Row } from './Table';
import { AuthorityInternalLinks } from './InternalLinks';
import MissingDocumentDialog from './MissingDocumentDialog';
import { fetchJson } from 'common/utils/request';
import { toReadableDateString } from 'common/utils/date';
import LoadingPage from 'common/components/LoadingPage';
import { Authority, Deceased, Inquest, InquestDocument } from 'common/models';

const useStyles = makeStyles((theme) => ({
  layout: {
    marginTop: theme.spacing(6),
  },
  headerSection: {
    marginLeft: theme.spacing(2),
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
      <Row name="Commentary">{inquest.notes}</Row>
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
      <span key={i}>
        {doc.name} &mdash;{' '}
        {doc.inquestDocumentLinks.length ? (
          _.sortBy(doc.inquestDocumentLinks, 'isFree').map((docLink, j) => (
            <span key={j}>
              <MuiLink href={docLink.link}>
                {docLink.documentSourceId === 'INQUESTS_CA'
                  ? 'View PDF'
                  : `View on ${docLink.documentSource.name}`}
              </MuiLink>
              {j !== doc.inquestDocumentLinks.length - 1 ? ', ' : null}
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
      <AuthorityInternalLinks authorities={authorities} category="Related Authorities" />
    </Section>
  );
};

const ViewInquest = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { inquestId } = useParams<{ inquestId: string }>();

  // TODO: on 404, redirect to homepage.
  const { data: inquest } = useQuery(['inquest', inquestId], (_key, inquestId: string) =>
    fetchJson<Inquest>(`/inquests/${inquestId}`)
  );

  const classes = useStyles();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (!inquest) return <LoadingPage />;

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
      <MissingDocumentDialog onClose={handleDialogClose} open={dialogOpen} />
    </Container>
  );
};

export default ViewInquest;

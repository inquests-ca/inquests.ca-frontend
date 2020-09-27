import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import Dialog from 'common/components/Dialog';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson } from 'common/services/requestUtils';
import { toReadableDateString } from 'common/services/utils';
import LoadingPage from 'common/components/LoadingPage';

const useStyles = makeStyles(theme => ({
  layout: {
    marginTop: theme.spacing(6)
  },
  headerSection: {
    marginLeft: theme.spacing(2)
  },
  section: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  sectionDivider: {
    height: '2px',
    marginBottom: theme.spacing(2)
  },
  nameCol: {
    textAlign: 'right',
    verticalAlign: 'top',
    paddingRight: theme.spacing(1),
    maxWidth: '200px'
  },
  bottomPadded: {
    paddingBottom: theme.spacing(1)
  },
  doc: {
    display: 'block'
  },
  primary: {
    color: theme.palette.secondary.main
  },
  metadata: {
    color: theme.palette.text.secondary,
    fontStyle: 'italic'
  },
  multiline: {
    // Used so newline characters are rendered as new lines.
    whiteSpace: 'pre-line'
  },
  invisible: {
    visibility: 'hidden'
  },
  // Overrides default anchor styling from anchor elements.
  internalLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  // Adds anchor styling to anchor elements without href attribute.
  modalLink: {
    cursor: 'pointer'
  }
}));

// TODO: move components to common file. Reduce overlap between this file and ViewAuthority.
function Section(props) {
  const { header, children, classes } = props;

  return (
    <Paper className={classes.section}>
      <Typography variant="h6" component="h3">
        {header}
      </Typography>
      <Divider className={classes.sectionDivider} />
      {children}
    </Paper>
  );
}

function Table(props) {
  const { children } = props;

  return (
    <table>
      <tbody>{children}</tbody>
    </table>
  );
}

function TextRow(props) {
  const { name, children, compact, classes } = props;

  // Do not display missing data.
  if (children === null) return null;

  return (
    <tr>
      <td className={compact ? classes.nameCol : clsx(classes.nameCol, classes.bottomPadded)}>
        <b>{name}:</b>
      </td>
      <td className={compact ? '' : classes.bottomPadded}>
        <Typography className={classes.multiline} variant="body2" component="p">
          {children || <span className={classes.metadata}>N/A</span>}
        </Typography>
      </td>
    </tr>
  );
}

function HeaderSection(props) {
  const { inquest, classes } = props;

  return (
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
}

function DetailsSection(props) {
  const { inquest, classes } = props;

  return (
    <Section header="Details" classes={classes}>
      <Table classes={classes}>
        <TextRow name="Overview" classes={classes}>
          {inquest.overview}
        </TextRow>
        <TextRow name="Synopsis" classes={classes}>
          {inquest.synopsis}
        </TextRow>
        <TextRow name="Notes" classes={classes}>
          {inquest.notes}
        </TextRow>
        <TextRow name="Presiding&nbsp;Officer" classes={classes}>
          {inquest.presidingOfficer}
        </TextRow>
        <TextRow name="Sitting Days" classes={classes}>
          {inquest.sittingDays}
        </TextRow>
        <TextRow name="Exhibits" classes={classes}>
          {inquest.exhibits}
        </TextRow>
      </Table>
    </Section>
  );
}

function DeceasedSection(props) {
  const { deceasedList, classes } = props;

  return (
    <Section header="Deceased" classes={classes}>
      {deceasedList.map((deceased, i) => (
        <div key={i}>
          <Typography variant="subtitle1" component="h4">
            {deceased.lastName || deceased.givenNames ? (
              `${deceased.lastName}, ${deceased.givenNames}`
            ) : (
              <span className={classes.metadata}>Name Withheld</span>
            )}
          </Typography>
          <Table classes={classes}>
            <TextRow compact name="Age" classes={classes}>
              {deceased.age}
            </TextRow>
            <TextRow compact name="Sex" classes={classes}>
              {deceased.sex}
            </TextRow>
            <TextRow compact name="Manner&nbsp;of&nbsp;Death" classes={classes}>
              {deceased.deathManner.name}
            </TextRow>
            <TextRow compact name="Cause&nbsp;of&nbsp;Death" classes={classes}>
              {deceased.deathCause}
            </TextRow>
            <TextRow compact name="Date&nbsp;of&nbsp;Death" classes={classes}>
              {toReadableDateString(deceased.deathDate)}
            </TextRow>
            <TextRow compact name="Reason&nbsp;for&nbsp;Inquest" classes={classes}>
              {deceased.inquestType.name}
            </TextRow>
          </Table>
          {i !== deceasedList.length - 1 ? <br /> : null}
        </div>
      ))}
    </Section>
  );
}

// TODO: display other document data as needed (creation date).
function DocumentsSection(props) {
  const { documents, onDialogOpen, onDialogClose, dialogOpen, classes } = props;

  const dialogTitle = 'No Document Link';
  const dialogContent = `
    Sorry, Inquests.ca does not currently have a link to this document. It may be that no public
    link exists, or there may be copyright or other issues which prevent posting a link. If you are
    aware of a public link, please feel free to forward it to the website Administrator.
  `;

  // TODO: display document type.
  // TODO: how to sort documents?
  // TODO: is it safe to have a user-inputted href?
  return (
    <React.Fragment>
      <Dialog
        onClose={onDialogClose}
        open={dialogOpen}
        title={dialogTitle}
        content={dialogContent}
      />
      <Section header="Documents" classes={classes}>
        {documents.map((doc, i) => (
          <span className={classes.doc} key={i}>
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
    </React.Fragment>
  );
}

function InternalLinksSection(props) {
  const { authorities, classes } = props;

  if (!authorities.length) return null;

  return (
    <Section header="Internal Links" classes={classes}>
      <Table classes={classes}>
        <TextRow name="Related&nbsp;Authorities" classes={classes}>
          {authorities.length
            ? authorities.map((authority, i) => (
                <Link
                  className={classes.internalLink}
                  key={i}
                  to={`/authority/${authority.authorityId}`}
                >
                  {authority.name}
                  <br />
                </Link>
              ))
            : null}
        </TextRow>
      </Table>
    </Section>
  );
}

export default function ViewInquest(props) {
  const [inquest, setInquest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { inquestId } = useParams();

  const isMounted = useMountedState();

  const { className } = props;

  useEffect(() => {
    const fetchInquest = async () => {
      const response = await fetchJson(`/inquests/${inquestId}`);
      if (!response.error && isMounted()) setInquest(response.data);
    };
    fetchInquest();
  }, [inquestId, isMounted]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const classes = useStyles();

  if (inquest === null) return <LoadingPage />;

  return (
    <Container className={clsx(className, classes.layout)}>
      <HeaderSection inquest={inquest} classes={classes} />
      <DetailsSection inquest={inquest} classes={classes} />
      <DeceasedSection deceasedList={inquest.deceased} classes={classes} />
      <DocumentsSection
        documents={inquest.inquestDocuments}
        onDialogOpen={handleDialogOpen}
        onDialogClose={handleDialogClose}
        dialogOpen={dialogOpen}
        classes={classes}
      />
      <InternalLinksSection authorities={inquest.authorities} classes={classes} />
    </Container>
  );
}

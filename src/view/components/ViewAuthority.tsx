import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

import Section from './Section';
import { Table, Row } from './Table';
import { InquestInternalLinks, AuthorityInternalLinks } from './InternalLinks';
import Dialog from 'common/components/Dialog';
import useMountedState from 'common/hooks/useMountedState';
import { fetchJson } from 'common/utils/request';
import { toReadableDateString } from 'common/utils/date';
import LoadingPage from 'common/components/LoadingPage';
import { Authority, AuthorityDocument } from 'common/models';
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
  invisible: {
    visibility: 'hidden',
  },
  // Adds anchor styling to anchor elements without href attribute.
  modalLink: {
    cursor: 'pointer',
  },
}));

const HeaderSection = ({ authority, classes }: { authority: Authority; classes: any }) => {
  const primaryDocument = _.find(
    authority.authorityDocuments,
    (doc) => doc.isPrimary
  ) as AuthorityDocument;

  // TODO: remove extra whitespace between fields when one field is undefined.
  return (
    <div className={classes.headerSection}>
      <Typography variant="h5" component="h1">
        {authority.name}
      </Typography>
      {authority.isPrimary ? (
        <Typography className={classes.primary} variant="h6" component="h2">
          Principal
        </Typography>
      ) : null}
      <Typography variant="h6" component="h2" gutterBottom>
        {primaryDocument.citation}
        <br />
        {primaryDocument.source.name}
        <br />
        {primaryDocument.created && toReadableDateString(primaryDocument.created)}
      </Typography>
    </div>
  );
};

const DetailsSection = ({ authority }: { authority: Authority }) => (
  <Section header="Details">
    <Table>
      <Row name="Overview">{authority.overview}</Row>
      <Row name="Synopsis">{authority.synopsis}</Row>
      <Row name="Notes">{authority.notes}</Row>
      <Row name="Quotes">{authority.quotes}</Row>
    </Table>
  </Section>
);

// TODO: display other document data as needed (citation, creation date).
// TODO: display document type.
// TODO: clean up UI.
// TODO: is it safe to have a user-inputted href?
const DocumentsSection = ({
  documents,
  onDialogOpen,
  classes,
}: {
  documents: AuthorityDocument[];
  onDialogOpen: () => void;
  classes: any;
}) => (
  <Section header="Documents">
    {_.reverse(_.sortBy(documents, ['isPrimary', 'source.rank'])).map((doc, i) => (
      <span className={classes.document} key={i}>
        {documents.length > 1 ? (
          doc.isPrimary ? (
            <span className={classes.primary}>&#9733;&nbsp;&nbsp;</span>
          ) : (
            <span className={classes.invisible}>&#9733;&nbsp;&nbsp;</span>
          )
        ) : null}
        <b>{doc.source.code}</b>,&nbsp;
        {doc.citation}&nbsp;&mdash;&nbsp;
        {doc.authorityDocumentLinks.length ? (
          _.sortBy(doc.authorityDocumentLinks, 'isFree').map((documentLink, i) => (
            <span key={i}>
              <MuiLink href={documentLink.link}>{documentLink.documentSource.name}</MuiLink>
              {i !== doc.authorityDocumentLinks.length - 1 ? ', ' : ''}
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

const InternalLinksSection = ({ authority }: { authority: Authority }) => {
  const {
    inquests,
    authorityRelated,
    authorityCitations,
    authorityCitedBy,
    authoritySuperceded,
    authoritySupercededBy,
  } = authority;

  // Hide this section if the authority does not contain internal links.
  if (
    _.every(
      [
        inquests,
        authorityRelated,
        authorityCitations,
        authorityCitedBy,
        authoritySuperceded,
        authoritySupercededBy,
      ],
      (arr) => !arr.length
    )
  )
    return null;

  return (
    <Section header="Internal Links">
      <Table>
        {!!authorityCitations.length && (
          <Row name="Citations">
            <AuthorityInternalLinks authorities={authorityCitations} />
          </Row>
        )}
        {!!authorityCitedBy.length && (
          <Row name="Cited&nbsp;By">
            <AuthorityInternalLinks authorities={authorityCitedBy} />
          </Row>
        )}
        {!!authoritySuperceded.length && (
          <Row name="Supercedes">
            <AuthorityInternalLinks authorities={authoritySuperceded} />
          </Row>
        )}
        {!!authoritySupercededBy.length && (
          <Row name="Superceded&nbsp;By">
            <AuthorityInternalLinks authorities={authoritySupercededBy} />
          </Row>
        )}
        {!!inquests.length && (
          <Row name="Related&nbsp;Inquests">
            <InquestInternalLinks inquests={inquests} />
          </Row>
        )}
        {!!authorityRelated.length && (
          <Row name="See&nbsp;Also">
            <AuthorityInternalLinks authorities={authorityRelated} />
          </Row>
        )}
      </Table>
    </Section>
  );
};

const ViewAuthority = () => {
  const [authority, setAuthority] = useState<Authority | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { authorityId } = useParams<{ authorityId: string }>();

  const isMounted = useMountedState();

  useEffect(() => {
    const fetchAuthority = async () => {
      const response = await fetchJson<Authority>(`/authorities/${authorityId}`);
      // TODO: on 404, redirect to homepage.
      if (!response.error && isMounted()) setAuthority(response.data!);
    };
    fetchAuthority();
  }, [authorityId, isMounted]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const classes = useStyles();

  if (authority === null) return <LoadingPage />;

  // TODO: fetching indicator.
  return (
    <Container className={classes.layout}>
      <HeaderSection authority={authority} classes={classes} />
      <DetailsSection authority={authority} />
      <DocumentsSection
        documents={authority.authorityDocuments}
        onDialogOpen={handleDialogOpen}
        classes={classes}
      />
      <InternalLinksSection authority={authority} />
      <Dialog
        title={TEXT_DOCUMENT_MISSING_DIALOG_TITLE}
        content={TEXT_DOCUMENT_MISSING_DIALOG_CONTENT}
        onClose={handleDialogClose}
        open={dialogOpen}
      />
    </Container>
  );
};

export default ViewAuthority;

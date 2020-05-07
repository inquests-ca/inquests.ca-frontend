import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import useMountedState from 'common/hooks/useMountedState';
import { fetchJson } from 'common/services/requestUtils';
import { toReadableDateString } from 'common/services/utils';

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
  }
}));

// TODO: move components to common file. Reduce overlap between this file and ViewInquest.
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
  const { authority, classes } = props;

  const primaryDocument = _.find(authority.authorityDocuments, doc => doc.isPrimary);

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
        {toReadableDateString(primaryDocument.created)}
      </Typography>
    </div>
  );
}

function DetailsSection(props) {
  const { authority, classes } = props;

  return (
    <Section header="Details" classes={classes}>
      <Table classes={classes}>
        <TextRow name="Overview" classes={classes}>
          {authority.overview}
        </TextRow>
        <TextRow name="Synopsis" classes={classes}>
          {authority.synopsis}
        </TextRow>
        <TextRow name="Notes" classes={classes}>
          {authority.notes}
        </TextRow>
        <TextRow name="Quotes" classes={classes}>
          {authority.quotes}
        </TextRow>
      </Table>
    </Section>
  );
}

// TODO: display other document data as needed (citation, creation date).
function DocumentsSection(props) {
  const { documents, classes } = props;

  const documentsSorted = _.reverse(_.sortBy(documents, ['isPrimary', 'source.rank']));

  // TODO: display document type.
  // TODO: clean up UI.
  // TODO: is it safe to have a user-inputted href?
  return (
    <Section header="Documents" classes={classes}>
      {documentsSorted.map((doc, i) => (
        <span className={classes.doc} key={i}>
          {documents.length > 1 ? (
            doc.isPrimary ? (
              <span className={classes.primary}>&#9733;&nbsp;&nbsp;</span>
            ) : (
              <span className={classes.invisible}>&#9733;&nbsp;&nbsp;</span>
            )
          ) : null}
          {doc.source.code},&nbsp;
          {doc.name}&nbsp;<i>({doc.citation})</i>&nbsp;&mdash;&nbsp;
          {_.sortBy(doc.authorityDocumentLinks, 'isFree').map((documentLink, i) => (
            <span key={i}>
              <Link href={documentLink.link}>{documentLink.documentSource.name}</Link>
              {i !== doc.authorityDocumentLinks.length - 1 ? ', ' : ''}
            </span>
          ))}
        </span>
      ))}
    </Section>
  );
}

function InternalLinksSection(props) {
  const { authority, classes } = props;

  const {
    inquests,
    authorityRelated,
    authorityCitations,
    authorityCitedBy,
    authoritySuperceded,
    authoritySupercededBy
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
        authoritySupercededBy
      ],
      arr => !arr.length
    )
  )
    return null;

  const internalLinksList = (entityType, entities) =>
    entities.length
      ? entities.map((entity, i) => (
          <Link key={i} href={`/${entityType}/${entity[`${entityType}Id`]}`}>
            {entity.name}
            <br />
          </Link>
        ))
      : null;

  return (
    <Section header="Internal Links" classes={classes}>
      <Table classes={classes}>
        <TextRow name="Related&nbsp;Inquests" classes={classes}>
          {internalLinksList('inquest', inquests)}
        </TextRow>
        <TextRow name="See&nbsp;Also" classes={classes}>
          {internalLinksList('authority', authorityRelated)}
        </TextRow>
        <TextRow name="Cites" classes={classes}>
          {internalLinksList('authority', authorityCitations)}
        </TextRow>
        <TextRow name="Cited&nbsp;By" classes={classes}>
          {internalLinksList('authority', authorityCitedBy)}
        </TextRow>
        <TextRow name="Supercedes" classes={classes}>
          {internalLinksList('authority', authoritySuperceded)}
        </TextRow>
        <TextRow name="Superceded&nbsp;By" classes={classes}>
          {internalLinksList('authority', authoritySupercededBy)}
        </TextRow>
      </Table>
    </Section>
  );
}

export default function ViewAuthority(props) {
  const [authority, setAuthority] = useState(null);

  const { authorityId } = useParams();

  const isMounted = useMountedState();

  const { className } = props;

  useEffect(() => {
    const fetchAuthority = async () => {
      const response = await fetchJson(`/authorities/${authorityId}`);
      if (!response.error && isMounted()) setAuthority(response.data);
    };
    fetchAuthority();
  }, [authorityId, isMounted]);

  const classes = useStyles();

  if (authority === null) return null;

  // TODO: fetching indicator.
  return (
    <Container className={clsx(className, classes.layout)}>
      <HeaderSection authority={authority} classes={classes} />
      <DetailsSection authority={authority} classes={classes} />
      <DocumentsSection documents={authority.authorityDocuments} classes={classes} />
      <InternalLinksSection authority={authority} classes={classes} />
    </Container>
  );
}

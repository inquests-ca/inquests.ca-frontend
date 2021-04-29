import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    margin: `${theme.spacing(6)}px ${theme.spacing(12)}px`,
  },
  li: {
    marginTop: theme.spacing(2),
  },
}));

export default function Legal() {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Typography variant="h4" component="h1">
        Inquests.ca Terms of Use
      </Typography>
      <Typography variant="body1" component="p">
        <ol>
          <li className={classes.li}>
            Every person who accesses Inquests.ca (“User”) consents to these terms of use, and
            acknowledges that these terms may be amended from time to time.
          </li>
          <li className={classes.li}>
            Inquests.ca facilitates access to legal information and contains commentary,{' '}
            <strong>but Inquests.ca is not legal advice</strong>. Information posted on Inquests.ca
            may be incomplete, outdated, or inaccurate. To get advice or a legal opinion on a
            particular situation, consult a licensed legal professional in your jurisdiction.
          </li>
          <li className={classes.li}>
            Inquests.ca may use Mixpanel to collect information about use of Inquests.ca, such as
            how often users visit Inquests.ca, and what pages they visit when they do so. We use the
            information we collect from Mixpanel to maintain and improve Inquests.ca. Mixpanel’s
            ability to use and share information collected by Mixpanel about your visits to and use
            of Inquests.ca is restricted by Mixpanel’s Terms of Use, available at{' '}
            <Link href="https://mixpanel.com/terms/">https://mixpanel.com/terms/</Link>, and
            Mixpanel’s Privacy Policy, available at{' '}
            <Link href="https://mixpanel.com/privacy/">https://mixpanel.com/privacy/</Link>. You can
            opt-out of Mixpanel at{' '}
            <Link href="https://mixpanel.com/optout/">https://mixpanel.com/optout/</Link>.
          </li>
          <li className={classes.li}>
            Inquests.ca reserves the intellectual property rights pertaining to Inquest.ca’s
            graphic, navigation and search tool design.
          </li>
          <li className={classes.li}>
            Users may copy, print and otherwise use the information displayed on Inquests.ca,
            including but not limited to case summaries, document classification, and lists of
            related cases. Such use is free of charge and without any other authorization from
            Inquests.ca, provided that Inquests.ca is identified as the source.
          </li>
          <li className={classes.li}>
            Where a User selects a link from Inquests.ca to another website, use of the link is
            subject to the terms and conditions of the website hosting the document, and any
            applicable statutes. Courts and government bodies may claim intellectual property rights
            relating to their documents. Users remain responsible for checking whether the intended
            use of the documents is authorized.
          </li>
          <li className={classes.li}>
            Inquests.ca can in no way be held responsible for damages caused directly or indirectly
            to a User by the use of the Inquests.ca website, or by its non-availability.
          </li>
        </ol>
        <strong>Acknowledgement:</strong> These terms are adapted from the Terms of Use of
        CanLII.ca,{' '}
        <Link href="https://www.canlii.org/en/info/terms.html">
          https://www.canlii.org/en/info/terms.html
        </Link>
        <br />
        <strong>Document Reference:</strong> Inquests.ca Terms of Use, effective December 28, 2020
      </Typography>
    </div>
  );
}

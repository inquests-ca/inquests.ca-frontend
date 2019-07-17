import React from 'react';
import PropTypes from 'prop-types';

import AuthorityEditor from '../AuthorityEditor';
import { createAuthority } from '../../../common/services/authorityApi';

export default function CreateAuthority(props) {
  const { currentUser } = props;

  const handleSubmit = authority => createAuthority(currentUser, authority);

  return (
    <AuthorityEditor
      pageTitle="Create New Authority"
      submitActionLabel="Create"
      onSubmit={handleSubmit}
    />
  );
}

CreateAuthority.propTypes = {
  currentUser: PropTypes.object.isRequired
};

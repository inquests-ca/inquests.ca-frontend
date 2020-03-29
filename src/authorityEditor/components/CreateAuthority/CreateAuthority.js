import React from 'react';
import PropTypes from 'prop-types';

import AuthorityEditor from '../AuthorityEditor';

export default function CreateAuthority(props) {
  const handleSubmit = authority => {};

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

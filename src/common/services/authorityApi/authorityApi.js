const authorityResponse = (authority, error) => ({ authority, error });

export const createAuthority = async (user, authority) => {
  console.log(
    'Unable to create authority. Note this app is only used to demo the inquests.ca project.'
  );
  return authorityResponse(authority, null);
};

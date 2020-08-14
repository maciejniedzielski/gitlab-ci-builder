const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const STATE_TOKEN = process.env.REACT_APP_STATE_TOKEN;
const REQUESTED_SCOPES = process.env.REACT_APP_REQUESTED_SCOPES;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

export const GITLAB_OAUTH2_URL = `
https://gitlab.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=token&state=${STATE_TOKEN}&scope=${REQUESTED_SCOPES}`;

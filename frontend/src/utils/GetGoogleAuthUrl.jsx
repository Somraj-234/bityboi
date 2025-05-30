export const getGoogleAuthUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: 'http://localhost:5173/auth/google/callback', // Must match exactly with Google Cloud Console
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // your web OAuth client ID
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
  };

  const queryString = new URLSearchParams(options).toString();
  return `${rootUrl}?${queryString}`;
};

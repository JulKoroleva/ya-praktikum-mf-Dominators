export const SERVER_HOST =
  typeof window === 'undefined'
    ? __INTERNAL_SERVER_URL__
    : `${window.location.protocol}//${window.location.hostname}:${__SERVER_PORT__}`;

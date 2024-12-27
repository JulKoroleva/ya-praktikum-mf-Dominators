export const ROUTES = {
  home: () => `/`,
  authorization: () => `/authorization`,
  registration: () => `/registration`,
  main: () => `/main`,
  game: () => `/game`,
  forum: () => `/forum`,
  profile: () => `/profile`,
  leaderboard: () => `/leaderboard`,
  oAuthTokenPage: () => `/oauth`,
  error: (code: string | number = ':code') => `/error/${code}`,
  topic: (id?: number) => `/forum/${id || ':id'}`,
};

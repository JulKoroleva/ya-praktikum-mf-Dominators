export const ROUTES = {
  home: () => `/`,
  authorization: () => `/authorization`,
  registration: () => `/registration`,
  main: () => `/main`,
  game: () => `/game`,
  forum: () => `/forum`,
  profile: () => `/profile`,
  leaderboard: () => `/leaderboard`,
  error: (code: number) => `/error${code}`,
  topic: () => `/forum/:id`,
};

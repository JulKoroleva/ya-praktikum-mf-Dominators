import {
  Authorization,
  Forum,
  Leaderboard,
  Main,
  Profile,
  Registration,
  Error,
  Game,
  Topic,
} from '@/pages';
import { ROUTES } from './constants/routes';
import { OAuthTokenPage } from './pages/OAuthTokenPage';

export const routes = [
  { path: ROUTES.authorization(), element: <Authorization /> },
  { path: ROUTES.registration(), element: <Registration /> },
  { path: ROUTES.main(), element: <Main /> },
  { path: ROUTES.home(), element: <Main /> },
  { path: ROUTES.game(), element: <Game /> },
  { path: ROUTES.forum(), element: <Forum /> },
  { path: ROUTES.leaderboard(), element: <Leaderboard /> },
  { path: ROUTES.oAuthTokenPage(), element: <OAuthTokenPage /> },
  { path: ROUTES.profile(), element: <Profile /> },
  { path: ROUTES.error(':code'), element: <Error /> },
  { path: ROUTES.topic(), element: <Topic /> },
  {
    path: '*',
    element: <Error />,
  },
];

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
import { Navigate } from 'react-router-dom';

export const routes = [
  { path: ROUTES.authorization(), element: <Authorization /> },
  { path: ROUTES.registration(), element: <Registration /> },
  { path: ROUTES.main(), element: <Main /> },
  { path: ROUTES.game(), element: <Game /> },
  { path: ROUTES.forum(), element: <Forum /> },
  { path: ROUTES.leaderboard(), element: <Leaderboard /> },
  { path: ROUTES.profile(), element: <Profile /> },
  { path: ROUTES.error(':code'), element: <Error /> },
  { path: ROUTES.topic(), element: <Topic /> },
  {
    path: ROUTES.home(),
    element: <Navigate to={ROUTES.main()} replace={true} />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.error(404)} replace={true} />,
  },
];

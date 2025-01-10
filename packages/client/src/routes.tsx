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
import { RootState, TypeDispatch } from './redux/store';
import { initForumPage } from './pages/Forum/Forum';

export const initPageWithoutData = () => Promise.resolve();

export const routes = [
  { path: ROUTES.authorization(), Component: Authorization, fetchData: initPageWithoutData },
  { path: ROUTES.registration(), Component: Registration, fetchData: initPageWithoutData },
  { path: ROUTES.main(), Component: Main, fetchData: initPageWithoutData },
  { path: ROUTES.home(), Component: Main, fetchData: initPageWithoutData },
  { path: ROUTES.game(), Component: Game, fetchData: initPageWithoutData },
  { path: ROUTES.forum(), Component: Forum, fetchData: initForumPage },
  { path: ROUTES.leaderboard(), Component: Leaderboard, fetchData: initPageWithoutData },
  { path: ROUTES.oAuthTokenPage(), Component: OAuthTokenPage, fetchData: initPageWithoutData },
  { path: ROUTES.profile(), Component: Profile, fetchData: initPageWithoutData },
  { path: ROUTES.error(':code'), Component: Error, fetchData: initPageWithoutData },
  { path: ROUTES.topic(), Component: Topic, fetchData: initForumPage },
  { path: '*', Component: Error, fetchData: initPageWithoutData },
];

export type PageInitArgs = {
  dispatch: TypeDispatch;
  state: RootState;
};

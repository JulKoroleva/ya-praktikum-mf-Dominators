import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import {
  Authorization,
  Forum,
  Leaderboard,
  Main,
  Profile,
  Registration,
  Error,
  Game,
} from '@/pages';
import { Topic } from './pages/Topic';

import { TypeDispatch } from './redux/store';
import { getUserInfoRequest } from './redux/requests';

import { ROUTES } from '@/constants/routes';

import { getCookie } from './services/cookiesHandler';
import { OAuthTokenPage } from './pages/OAuthTokenPage';

const authCookie = getCookie('auth');

const routes = [
  { path: ROUTES.authorization(), element: <Authorization /> },
  { path: ROUTES.registration(), element: <Registration /> },
  { path: ROUTES.main(), element: <Main /> },
  { path: ROUTES.game(), element: <Game /> },
  { path: ROUTES.forum(), element: <Forum /> },
  { path: ROUTES.leaderboard(), element: <Leaderboard /> },
  { path: ROUTES.profile(), element: <Profile /> },
  { path: ROUTES.oAuthTokenPage(), element: <OAuthTokenPage /> },
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

function App() {
  const dispatch = useDispatch<TypeDispatch>();
  useEffect(() => {
    const fetchServerData = async () => {
      if (typeof __SERVER_PORT__ === 'undefined') return;
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  useEffect(() => {
    if (authCookie) {
      dispatch(getUserInfoRequest());
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

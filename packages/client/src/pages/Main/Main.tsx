import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import './style.scss';

export const Main = () => {
  return (
    <div className="main-page">
      Main
      <Link to={ROUTES.authorization()}>Authorization</Link>
      <Link to={ROUTES.registration()}>Registration</Link>
      <Link to={ROUTES.game()}>Game</Link>
      <Link to={ROUTES.forum()}>Forum</Link>
      <Link to={ROUTES.leaderboard()}>Leaderboard</Link>
      <Link to={ROUTES.profile()}>Profile</Link>
      <Link to={ROUTES.error(404)}>Error 404</Link>
    </div>
  );
};

import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {
  Authorization,
  Forum,
  Leaderboard,
  Main,
  Profile,
  Registration,
  Error,
  Game,
} from './pages'
import { ROUTES } from './constants'
import './App.scss'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.authorization()} element={<Authorization />} />
        <Route path={ROUTES.registration()} element={<Registration />} />
        <Route
          path={ROUTES.home()}
          element={<Navigate to={ROUTES.main()} replace={true} />}
        />
        <Route path={ROUTES.main()} element={<Main />} />
        <Route path={ROUTES.game()} element={<Game />} />
        <Route path={ROUTES.forum()} element={<Forum />} />
        <Route path={ROUTES.leaderboard()} element={<Leaderboard />} />
        <Route path={ROUTES.profile()} element={<Profile />} />
        <Route path={ROUTES.error(404)} element={<Error />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.error(404)} replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

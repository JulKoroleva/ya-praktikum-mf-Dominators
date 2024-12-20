import { Header } from '../components/Header';

export const FriendsPage = () => {
  const friends = [{ name: 'Петя', secondName: 'Семенов' }];

  return (
    <div className="App">
      <Header />
      <h3>Пользователь не найден</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend.name}>
            {friend.name} {friend.secondName}
          </li>
        ))}
      </ul>
    </div>
  );
};

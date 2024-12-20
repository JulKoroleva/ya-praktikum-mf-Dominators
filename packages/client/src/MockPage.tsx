import { useEffect, useState } from 'react';

export const MockPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect at render');
  }, []);

  return (
    <section>
      <h1>Hello there!</h1>
      <p>This page was rendered on server!</p>
      <button onClick={() => setCount(count + 1)}>{`Count: ${count}`}</button>
    </section>
  );
};

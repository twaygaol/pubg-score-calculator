'use client'; // Add this line at the top

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}

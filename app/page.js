'use client';

import { useState } from 'react';
import InputForm from '../components/InputForm';

const calculatePoints = (kills, position) => {
  const killPoints = kills * 10;
  const positionPoints = 100 - (position * 5);
  return killPoints + positionPoints;
};

const Home = () => {
  const [points, setPoints] = useState(null);

  const handleCalculate = (kills, position) => {
    const totalPoints = calculatePoints(kills, position);
    setPoints(totalPoints);
  };

  return (
    <div>
      <h1>PUBG Mobile Score Calculator</h1>
      <InputForm onCalculate={handleCalculate} />
      {points !== null && (
        <div>
          <h2>Total Points: {points}</h2>
        </div>
      )}
    </div>
  );
};

export default Home;

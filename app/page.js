'use client';

import { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import RankingTable from '../components/RangkingTable';

const calculatePoints = (kills, position) => {
  const killPoints = kills * 20;
  const positionPoints = 100 - (position * 5);
  return killPoints + positionPoints;
};

const Home = () => {
  const [points, setPoints] = useState(null);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const storedRankings = JSON.parse(localStorage.getItem('teams')) || [];
    setRankings(storedRankings);
  }, []);

  const handleCalculate = (teamName, kills, position) => {
    const totalPoints = calculatePoints(kills, position);
    setPoints(totalPoints);
    const newRanking = {
      rank: rankings.length + 1,
      team: teamName,
      match: 1,
      elimination: kills,
      point: totalPoints,
      total: totalPoints,
    };
    const updatedRankings = [...rankings, newRanking]
      .sort((a, b) => b.total - a.total)
      .map((ranking, index) => ({ ...ranking, rank: index + 1 }));
    setRankings(updatedRankings);
    localStorage.setItem('teams', JSON.stringify(updatedRankings));
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
      <h2>Ranking Table</h2>
      <RankingTable rankings={rankings} />
    </div>
  );
};

export default Home;

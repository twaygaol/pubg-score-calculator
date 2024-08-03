import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import InputForm from '@/components/InputForm';
import RankingTable from '@/components/RangkingTable';

const calculatePoints = (kills, position) => {
  const killPoints = kills * 20;
  const positionPoints = 100 - (position * 5);
  return killPoints + positionPoints;
};

const Dashboard = () => {
  const { data: session } = useSession();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [points, setPoints] = useState(null);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
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

  const logout = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  return (
      <div>
        {session ? (
          <div>
            <h1>Dashboard</h1>
            <button onClick={logout}>Sign Out</button>
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
          </div>
        ) : (
          <div>
            <p>You are not signed in. Please sign in first.</p>
          </div>
        )}
      </div>
  );
};

export default Dashboard;

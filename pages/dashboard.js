import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const Dashboard = () => {
  const { data: session } = useSession();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
  }, []);

  const addTeam = () => {
    const newTeam = { name: teamName, points: 0 };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    setTeamName('');
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
            <input
              type='text'
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <button onClick={addTeam}>Add Team</button>
          </div>
          <h2>Teams</h2>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>
                {team.name} - Points: {team.points}
              </li>
            ))}
          </ul>
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

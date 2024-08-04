'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function BracketPage() {
  const { data: session } = useSession();
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({
    teamName: '',
    match: '',
    kills: '',
    rank: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch initial data from local storage or an API
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    const storedMatches = JSON.parse(localStorage.getItem('matches')) || [];
    const storedPoints = JSON.parse(localStorage.getItem('points')) || [];
    setTeams(storedTeams);
    setMatches(storedMatches);
    setPoints(storedPoints);
  }, []);

  // Function to get place points based on rank
  const getPlacePoints = (rank) => {
    if (rank === 1) return 10;
    if (rank === 2) return 6;
    if (rank === 3) return 5;
    if (rank === 4) return 4;
    if (rank === 5) return 3;
    if (rank === 6) return 2;
    if (rank <= 8) return 1;
    return 0;
  };

  const calculateTotalPoints = (kills, rank) => {
    const placePoints = getPlacePoints(parseInt(rank, 10));
    return parseInt(kills, 10) + placePoints; // Add place points to kills
  };

  const handleAddPoint = () => {
    const totalPoints = calculateTotalPoints(newPoint.kills, newPoint.rank);

    // Update points data
    const updatedPoints = [...points, { ...newPoint, totalPoints }];
    setPoints(updatedPoints);
    localStorage.setItem('points', JSON.stringify(updatedPoints));
    setNewPoint({
      teamName: '',
      match: '',
      kills: '',
      rank: '',
    });
    setShowModal(false);
  };

  // Function to handle deletion of a point entry
  const handleDelete = (index) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setPoints(updatedPoints);
    localStorage.setItem('points', JSON.stringify(updatedPoints));
  };

  // Calculate cumulative points and kills for each team
  const getCumulativePoints = () => {
    const teamTotals = {};

    points.forEach(({ teamName, match, kills, totalPoints }) => {
      if (!teamTotals[teamName]) {
        teamTotals[teamName] = { totalPoints: 0, totalKills: 0, matchDetails: [] };
      }
      teamTotals[teamName].totalPoints += totalPoints;
      teamTotals[teamName].totalKills += parseInt(kills, 10);

      // Add match details
      teamTotals[teamName].matchDetails.push({ match, kills, totalPoints });
    });

    const sortedTeams = Object.entries(teamTotals)
      .map(([teamName, { totalPoints, totalKills, matchDetails }]) => ({
        teamName,
        totalPoints,
        totalKills,
        matchDetails,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return sortedTeams.map((team, index) => ({
      ...team,
      rank: index + 1,
    }));
  };

  const cumulativePoints = getCumulativePoints();

  if (!session) {
    return <p>You are not signed in. Please <Link href="/">sign in</Link>.</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
      <header className="w-full bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">Bracket</h1>
        <Link href="/dashboard">
          <h1 className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700">Back to Dashboard</h1>
        </Link>
      </header>
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Bracket Page</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
          Add Points
        </button>
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Rank</th>
                <th className="py-2 px-4 border-b">Team Name</th>
                <th className="py-2 px-4 border-b">Total Kills</th>
                <th className="py-2 px-4 border-b">Total Points</th>
                <th className="py-2 px-4 border-b">Match Details</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {cumulativePoints.map((team, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{team.rank}</td>
                  <td className="py-2 px-4 border-b">{team.teamName}</td>
                  <td className="py-2 px-4 border-b">{team.totalKills}</td>
                  <td className="py-2 px-4 border-b">{team.totalPoints}</td>
                  <td className="py-2 px-4 border-b">
                    {team.matchDetails.map((detail, i) => (
                      <div key={i}>
                        <span>{detail.match} - Kills: {detail.kills}, Points: {detail.totalPoints}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Points</h2>
              <select
                value={newPoint.teamName}
                onChange={(e) => setNewPoint({ ...newPoint, teamName: e.target.value })}
                className="border p-2 mb-4 w-full"
              >
                <option value="">Select Team</option>
                {teams.map((team, index) => (
                  <option key={index} value={team.name}>{team.name}</option>
                ))}
              </select>
              <select
                value={newPoint.match}
                onChange={(e) => setNewPoint({ ...newPoint, match: e.target.value })}
                className="border p-2 mb-4 w-full"
              >
                <option value="">Select Match</option>
                {matches.map((match, index) => (
                  <option key={index} value={match.name}>{match.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Kills"
                value={newPoint.kills}
                onChange={(e) => setNewPoint({ ...newPoint, kills: e.target.value })}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="number"
                placeholder="Rank"
                value={newPoint.rank}
                onChange={(e) => setNewPoint({ ...newPoint, rank: e.target.value })}
                className="border p-2 mb-4 w-full"
              />
              <input
                type="number"
                placeholder="Total Points"
                value={calculateTotalPoints(newPoint.kills, newPoint.rank)}
                readOnly
                className="border p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddPoint}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        </section>
      </main>
    </div>
  );
}

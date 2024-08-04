'use client'; // Ensures this is a Client Component

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [bracketResults, setBracketResults] = useState([]);

  useEffect(() => {
    // Fetch bracket data from local storage
    const storedPoints = JSON.parse(localStorage.getItem('points')) || [];

    // Function to calculate cumulative points
    const getCumulativePoints = () => {
      const teamTotals = {};

      storedPoints.forEach(({ teamName, match, kills, totalPoints }) => {
        if (!teamTotals[teamName]) {
          teamTotals[teamName] = { totalPoints: 0, totalKills: 0, matchDetails: [] };
        }
        teamTotals[teamName].totalPoints += totalPoints;
        teamTotals[teamName].totalKills += parseInt(kills, 10);
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

    setBracketResults(getCumulativePoints());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">PUBG MOBILE</h1>
          <p className="text-lg">PEKAN E-SPORT UNPAB VOL.II 2024</p>
          <p className="text-lg mb-8">🧭Kamis, 8 Agustus 2024</p>
        </div>
      <main className='w-full max-w-4xl  p-6 rounded-lg shadow-sm mb-8'>
        <section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Overall Rangking Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-sm bg-white border border-gray-300">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b">Team Name</th>
                  <th className="py-2 px-4 border-b">Total Kills</th>
                  <th className="py-2 px-4 border-b">Total Points</th>
                  <th className="py-2 px-4 border-b">Match Details</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {bracketResults.map((team, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b font-semibold">#{team.rank}</td>
                    <td className="py-2 px-4 border-b bg-blue-300 p-2 rounded-sm text-black font-semibold">{team.teamName}</td>
                    <td className="py-2 px-4 border-b">{team.totalKills}</td>
                    <td className="py-2 px-4 border-b">{team.totalPoints}</td>
                    <td className="py-2 px-4 border-b">
                      {team.matchDetails.map((detail, i) => (
                        <div key={i}>
                          <span>{detail.match}: Kills {detail.kills}, Points {detail.totalPoints}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <footer className=" justify-between items-center mb-4">
          <h1 className="text-xl mb-4 font-semibold">Note :</h1>
          <table className="">
              <thead className='bg-gray-600 text-white'>
                <tr>
                  <th className="py-1 px-2 border-b">Rank</th>
                  <th className="py-1 px-2 border-b">Point</th>
                </tr>
              </thead>
              <tbody className='text-center'>
               <tr>
                <td className="py-1 px-2 border-b">1</td>
                <td className="py-1 px-2 border-b">10 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">2</td>
                <td className="py-1 px-2 border-b">6 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">3</td>
                <td className="py-1 px-2 border-b">5 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">4</td>
                <td className="py-1 px-2 border-b">4 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">5</td>
                <td className="py-1 px-2 border-b">3 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">6</td>
                <td className="py-1 px-2 border-b">2 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">7-8</td>
                <td className="py-1 px-2 border-b">1 point</td>
               </tr>
               <tr>
                <td className="py-1 px-2 border-b">9-16</td>
                <td className="py-1 px-2 border-b">0 point</td>
               </tr>
              </tbody>
            </table>
        </footer>
        </main>
    </div>
  );
}
